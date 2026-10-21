import { dictionary, patterns } from "./arabicDictionary";

const SKIP_SELECTOR = "script, style, textarea, noscript, code, pre, [translate='no']";
const ATTRS = ["placeholder", "title", "aria-label"];
const OBSERVER_CONFIG = {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ATTRS,
};

let currentLang = "en";
let observer = null;

const textStore = new WeakMap(); // عقدة نص ← { النص الأصلي, المترجم }
const attrStore = new WeakMap(); // عنصر ← { خاصية: { الأصلي, المترجم } }
const missing = new Set();       // نصوص ما لقينا إلها ترجمة

// ====== الترجمة ======
function translate(text) {
    const [, start, core, end] = text.match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!core) return text;

    const key = core.replace(/\s+/g, " ");
    let out = dictionary[key];

    if (out === undefined) {
        for (const [regex, fn] of patterns) {
            const m = key.match(regex);
            if (m) {
                out = fn(...m.slice(1));
                break;
            }
        }
    }

    if (out === undefined) {
        if (/[A-Za-z]{2,}/.test(key)) missing.add(key);
        return text;
    }

    return start + out + end;
}

function isSkipped(node) {
    const el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    return !el || !!el.closest(SKIP_SELECTOR);
}

function translateTextNode(node) {
    if (isSkipped(node)) return;

    const current = node.nodeValue;
    const rec = textStore.get(node);

    // لسا مترجمة، ما تغيّر شي
    if (rec && current === rec.out) return;

    // نص جديد (من React أو من الصفحة)
    const out = translate(current);
    if (out !== current) {
        textStore.set(node, { orig: current, out });
        node.nodeValue = out;
    } else if (rec) {
        textStore.delete(node);
    }
}

function translateAttrs(el) {
    if (isSkipped(el)) return;

    let rec = attrStore.get(el);

    for (const attr of ATTRS) {
        const value = el.getAttribute(attr);
        if (!value) continue;

        const prev = rec?.[attr];
        if (prev && value === prev.out) continue;

        const out = translate(value);
        if (out !== value) {
            rec = rec || {};
            rec[attr] = { orig: value, out };
            attrStore.set(el, rec);
            el.setAttribute(attr, out);
        } else if (prev) {
            delete rec[attr];
        }
    }
}

function translateTree(root) {
    if (root.nodeType === Node.TEXT_NODE) return translateTextNode(root);
    if (root.nodeType !== Node.ELEMENT_NODE) return;

    translateAttrs(root);

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
        if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
        else translateAttrs(node);
    }
}

// ====== الرجوع للإنجليزي ======
function restoreTree(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
        if (node.nodeType === Node.TEXT_NODE) {
            const rec = textStore.get(node);
            if (rec) {
                if (node.nodeValue === rec.out) node.nodeValue = rec.orig;
                textStore.delete(node);
            }
        } else {
            const rec = attrStore.get(node);
            if (rec) {
                for (const [attr, { orig, out }] of Object.entries(rec)) {
                    if (node.getAttribute(attr) === out) node.setAttribute(attr, orig);
                }
                attrStore.delete(node);
            }
        }
    }
}

// ====== المراقب: بيترجم أي شي جديد بيظهر بالصفحة ======
// بنوقفه وقت التعديل حتى ما يشوف تغييراتنا ويدخل بحلقة
function run(fn) {
    observer.disconnect();
    try {
        fn();
    } finally {
        observer.observe(document.body, OBSERVER_CONFIG);
    }
}

function handleMutations(mutations) {
    if (currentLang !== "ar") return;

    run(() => {
        for (const m of mutations) {
            if (m.type === "characterData") translateTextNode(m.target);
            else if (m.type === "attributes") translateAttrs(m.target);
            else m.addedNodes.forEach(translateTree);
        }
    });
}

// ====== الدالة الرئيسية ======
export function applyLanguage(lang) {
    currentLang = lang === "ar" ? "ar" : "en";

    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";

    if (!observer) observer = new MutationObserver(handleMutations);

    run(() => {
        if (currentLang === "ar") translateTree(document.body);
        else restoreTree(document.body);
    });
}

// بالكونسول: missingTranslations() بتعرض النصوص اللي ما إلها ترجمة
if (typeof window !== "undefined") {
    window.missingTranslations = () => {
        const list = [...missing];
        console.log(list.map((t) => `    ${JSON.stringify(t)}: "",`).join("\n"));
        return list.length;
    };
}