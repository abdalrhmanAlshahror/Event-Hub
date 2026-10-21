import { createContext, useContext, useEffect, useState } from "react";
import { applyLanguage } from "../i18n/autoTranslate";

const LanguageContext = createContext({
    lang: "en",
    setLang: () => {},
    toggleLang: () => {},
});

const getSavedLang = () => {
    try {
        return localStorage.getItem("lang") === "ar" ? "ar" : "en";
    } catch {
        return "en";
    }
};

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(getSavedLang);

    useEffect(() => {
        applyLanguage(lang);
        try {
            localStorage.setItem("lang", lang);
        } catch {
            // تجاهل
        }
    }, [lang]);

    const toggleLang = () => setLang((prev) => (prev === "ar" ? "en" : "ar"));

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);