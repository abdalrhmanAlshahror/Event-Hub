import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faLock,
    faBell,
    faGlobe,
    faArrowUpFromBracket,
    faFloppyDisk,
    faXmark,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios";

const API_URL = "http://localhost:8000";
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

const inputClass =
    "w-full bg-[#0f0f1e]/80 border border-rose-500/20 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/20 transition-all";

const tabs = [
    { key: "profile", label: "Profile Info", icon: faUser },
    { key: "security", label: "Security & Password", icon: faLock },
    { key: "notifications", label: "Notifications", icon: faBell },
    { key: "language", label: "Language & Region", icon: faGlobe },
];

const notificationItems = [
    { key: "notify_email", label: "Email Notifications" },
    { key: "notify_reminders", label: "Event Reminders" },
    { key: "notify_promotions", label: "Promotions & Updates" },
    { key: "notify_newsletter", label: "Weekly Newsletter" },
];

const languages = [
    { value: "en", label: "English" },
    { value: "ar", label: "العربية" },
];

const timezones = [
    { value: "UTC", label: "UTC +0:00 (UTC)" },
    { value: "Europe/London", label: "UTC +0:00 (London, UK)" },
    { value: "Europe/Amsterdam", label: "UTC +1:00 (Amsterdam, Netherlands)" },
    { value: "Africa/Cairo", label: "UTC +2:00 (Cairo, Egypt)" },
    { value: "Asia/Damascus", label: "UTC +3:00 (Damascus, Syria)" },
    { value: "Asia/Riyadh", label: "UTC +3:00 (Riyadh, Saudi Arabia)" },
    { value: "Asia/Dubai", label: "UTC +4:00 (Dubai, UAE)" },
    { value: "America/New_York", label: "UTC -5:00 (New York, USA)" },
];

const getErrorMessage = (err) => {
    const msg = err.response?.data?.message;
    if (msg && typeof msg === "object") return Object.values(msg).flat()[0];
    return msg || "Something went wrong";
};

const photoUrl = (path) => {
    if (!path) return null;
    return path.startsWith("http") ? path : `${API_URL}/${path}`;
};

// ====== مفتاح التشغيل ======
function Toggle({ checked, onChange }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={onChange}
            className={`relative w-14 h-8 rounded-full transition-colors cursor-pointer shrink-0 ${
                checked ? "bg-gradient-to-r from-orange-500 to-rose-500" : "bg-gray-600/60"
            }`}
        >
            <span
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200 ${
                    checked ? "translate-x-6" : ""
                }`}
            />
        </button>
    );
}

// ====== أزرار الحفظ والإلغاء ======
function FormActions({ saving, onCancel }) {
    return (
        <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-white/5">
            <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white text-lg font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all cursor-pointer disabled:opacity-60"
            >
                <FontAwesomeIcon icon={faFloppyDisk} />
                {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
                type="button"
                onClick={onCancel}
                className="flex items-center gap-3 px-8 py-4 rounded-xl bg-white/5 text-gray-300 text-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
                <FontAwesomeIcon icon={faXmark} /> Cancel
            </button>
        </div>
    );
}

function Settings() {
    const navigate = useNavigate();
    const fileInput = useRef(null);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [activeTab, setActiveTab] = useState("profile");

    // رسالة النجاح أو الخطأ (بتتصفّر لما تغيّر التبويب)
    const [status, setStatus] = useState(null);
    const [saving, setSaving] = useState(false);

    // Profile
    const [form, setForm] = useState({ name: "", email: "", bio: "" });
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    // Security
    const emptyPasswords = { current_password: "", password: "", password_confirmation: "" };
    const [passwords, setPasswords] = useState(emptyPasswords);

    // Notifications
    const [notifications, setNotifications] = useState({});

    // Language & Region
    const [prefs, setPrefs] = useState({ language: "en", timezone: "Asia/Dubai" });

    const syncFromUser = (u) => {
        setForm({ name: u.name || "", email: u.email || "", bio: u.bio || "" });
        setNotifications({
            notify_email: !!u.notify_email,
            notify_reminders: !!u.notify_reminders,
            notify_promotions: !!u.notify_promotions,
            notify_newsletter: !!u.notify_newsletter,
        });
        setPrefs({
            language: u.language || "en",
            timezone: u.timezone || "Asia/Dubai",
        });
    };

    useEffect(() => {
        api.get("/api/me")
            .then((res) => {
                setUser(res.data.user);
                syncFromUser(res.data.user);
            })
            .catch((err) => {
                console.error(err);
                if (err.response?.status === 401) {
                    navigate("/login");
                } else {
                    setLoadError("Failed to load your account");
                }
            })
            .finally(() => setLoading(false));
    }, []);

    // نظّف رابط المعاينة
    useEffect(() => {
        return () => {
            if (photoPreview) URL.revokeObjectURL(photoPreview);
        };
    }, [photoPreview]);

    const changeTab = (key) => {
        setActiveTab(key);
        setStatus(null);
    };

    // ====== دالة عامة للحفظ ======
    const submit = (request, onSuccess) => {
        setSaving(true);
        setStatus(null);

        request()
            .then((res) => onSuccess(res))
            .catch((err) => {
                console.error(err);
                if (err.response?.status === 401) {
                    navigate("/login");
                } else {
                    setStatus({ type: "error", text: getErrorMessage(err) });
                }
            })
            .finally(() => setSaving(false));
    };

    // ====== Profile ======
    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setStatus(null);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file) return;

        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
            setStatus({ type: "error", text: "Photo must be a JPG, PNG or GIF" });
            return;
        }
        if (file.size > MAX_SIZE) {
            setStatus({ type: "error", text: "Photo must be smaller than 2MB" });
            return;
        }

        setStatus(null);
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    const cancelProfile = () => {
        syncFromUser(user);
        setPhotoFile(null);
        setPhotoPreview(null);
        setStatus(null);
    };

    const saveProfile = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", form.name);
        data.append("email", form.email);
        data.append("bio", form.bio);
        if (photoFile) data.append("profile_photo", photoFile);

        submit(
            () => api.post("/api/profile", data),
            (res) => {
                setUser(res.data.user);
                syncFromUser(res.data.user);
                setPhotoFile(null);
                setPhotoPreview(null);
                setStatus({ type: "success", text: "Your profile has been updated successfully" });
            }
        );
    };

    // ====== Security ======
    const handlePasswordChange = (e) => {
        setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setStatus(null);
    };

    const savePassword = (e) => {
        e.preventDefault();

        const { password, password_confirmation } = passwords;

        if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            setStatus({
                type: "error",
                text: "Password must be at least 8 characters and include uppercase, lowercase, and numbers",
            });
            return;
        }

        if (password !== password_confirmation) {
            setStatus({ type: "error", text: "New password and confirmation do not match" });
            return;
        }

        submit(
            () => api.put("/api/settings/password", passwords),
            () => {
                setPasswords(emptyPasswords);
                setStatus({ type: "success", text: "Your password has been changed successfully" });
            }
        );
    };

    // ====== Notifications ======
    const saveNotifications = (e) => {
        e.preventDefault();

        submit(
            () => api.put("/api/settings/notifications", notifications),
            (res) => {
                setUser(res.data.user);
                syncFromUser(res.data.user);
                setStatus({ type: "success", text: "Notification settings saved" });
            }
        );
    };

    // ====== Language & Region ======
    const savePrefs = (e) => {
        e.preventDefault();

        submit(
            () => api.put("/api/settings/preferences", prefs),
            (res) => {
                setUser(res.data.user);
                syncFromUser(res.data.user);
                setStatus({ type: "success", text: "Language and region settings saved" });
            }
        );
    };

    // زر Cancel بالتبويبات التانية: بيرجّع القيم المحفوظة
    const cancelGeneric = () => {
        syncFromUser(user);
        setPasswords(emptyPasswords);
        setStatus(null);
    };

    if (loading) {
        return <p className="text-white pt-10 text-center">Loading...</p>;
    }

    if (loadError) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
                <p className="text-rose-400 text-xl">{loadError}</p>
                <Link to="/home" className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white">
                    Back to Home
                </Link>
            </div>
        );
    }

    const currentPhoto = photoPreview || photoUrl(user.profile_photo);

    const statusMessage = status && (
        <p className={`mt-6 ${status.type === "success" ? "text-emerald-400" : "text-rose-400"}`}>
            {status.text}
        </p>
    );

    return (
        <div className="container mx-auto px-6 py-10 text-left">
            <h1 className="text-5xl font-bold text-white mb-10">Account Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">

                {/* ====== القائمة الجانبية ====== */}
                <div className="bg-gradient-to-br from-[#1a1a2e]/60 to-[#0f0f1e]/60 border border-rose-500/10 rounded-3xl p-4 space-y-2">
                    {tabs.map((t) => {
                        const isActive = activeTab === t.key;
                        return (
                            <button
                                key={t.key}
                                onClick={() => changeTab(t.key)}
                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all cursor-pointer ${
                                    isActive
                                        ? "bg-gradient-to-r from-orange-500/30 to-rose-500/30 border border-orange-400/40 text-orange-200"
                                        : "border border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <FontAwesomeIcon icon={t.icon} className="w-5" />
                                <span className="font-medium">{t.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* ====== المحتوى ====== */}
                <div className="bg-gradient-to-br from-[#1a1a2e]/60 to-[#0f0f1e]/60 border border-rose-500/10 rounded-3xl p-8 md:p-10">

                    {/* ---------- Profile Info ---------- */}
                    {activeTab === "profile" && (
                        <form onSubmit={saveProfile}>
                            <h2 className="text-3xl text-white font-medium mb-8">Profile Info</h2>

                            <div className="flex items-center gap-6 mb-10">
                                {currentPhoto ? (
                                    <img
                                        src={currentPhoto}
                                        alt={user.name}
                                        className="w-32 h-32 rounded-full object-cover border-4 border-orange-500/30"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white text-5xl font-bold border-4 border-orange-500/30">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}

                                <div>
                                    <input
                                        ref={fileInput}
                                        type="file"
                                        accept="image/png,image/jpeg,image/gif"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInput.current?.click()}
                                        className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500/30 to-rose-500/30 border border-orange-400/40 text-orange-200 text-lg hover:from-orange-500/50 hover:to-rose-500/50 transition-all cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faArrowUpFromBracket} /> Upload Photo
                                    </button>
                                    <p className="text-gray-500 mt-3">JPG, PNG or GIF (Max 2MB)</p>
                                    {photoFile && (
                                        <p className="text-orange-300 text-sm mt-1">New photo selected, click Save to apply it</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-7">
                                <div>
                                    <label className="block text-lg text-white font-medium mb-3">Full Name</label>
                                    <input name="name" value={form.name} onChange={handleChange} className={inputClass} required />
                                </div>

                                <div>
                                    <label className="block text-lg text-white font-medium mb-3">Professional Bio</label>
                                    <textarea
                                        name="bio"
                                        value={form.bio}
                                        onChange={handleChange}
                                        rows={5}
                                        maxLength={500}
                                        placeholder="Tell people a little about yourself..."
                                        className={`${inputClass} resize-none`}
                                    />
                                    <p className="text-sm text-gray-500 text-right mt-1">{form.bio.length}/500</p>
                                </div>

                                <div>
                                    <label className="block text-lg text-white font-medium mb-3">Email Address</label>
                                    <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} required />
                                </div>
                            </div>

                            {statusMessage}
                            <FormActions saving={saving} onCancel={cancelProfile} />
                        </form>
                    )}

                    {/* ---------- Security & Password ---------- */}
                    {activeTab === "security" && (
                        <form onSubmit={savePassword}>
                            <h2 className="text-3xl text-white font-medium mb-8">Security & Password</h2>

                            <div className="space-y-7">
                                <div>
                                    <label className="block text-lg text-gray-200 font-medium mb-3">Current Password</label>
                                    <input
                                        type="password"
                                        name="current_password"
                                        value={passwords.current_password}
                                        onChange={handlePasswordChange}
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        className={inputClass}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg text-gray-200 font-medium mb-3">New Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={passwords.password}
                                        onChange={handlePasswordChange}
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        className={inputClass}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg text-gray-200 font-medium mb-3">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        value={passwords.password_confirmation}
                                        onChange={handlePasswordChange}
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        className={inputClass}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-7 px-6 py-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-200">
                                Password must be at least 8 characters and include uppercase, lowercase, and numbers.
                            </div>

                            {statusMessage}
                            <FormActions saving={saving} onCancel={cancelGeneric} />
                        </form>
                    )}

                    {/* ---------- Notifications ---------- */}
                    {activeTab === "notifications" && (
                        <form onSubmit={saveNotifications}>
                            <h2 className="text-3xl text-white font-medium mb-8">Notifications</h2>

                            <div className="space-y-4">
                                {notificationItems.map((item) => (
                                    <div
                                        key={item.key}
                                        className="flex items-center justify-between px-6 py-5 bg-[#0f0f1e]/80 border border-white/5 rounded-2xl"
                                    >
                                        <span className="text-lg text-white">{item.label}</span>
                                        <Toggle
                                            checked={!!notifications[item.key]}
                                            onChange={() => {
                                                setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }));
                                                setStatus(null);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {statusMessage}
                            <FormActions saving={saving} onCancel={cancelGeneric} />
                        </form>
                    )}

                    {/* ---------- Language & Region ---------- */}
                    {activeTab === "language" && (
                        <form onSubmit={savePrefs}>
                            <h2 className="text-3xl text-white font-medium mb-8">Language & Region</h2>

                            <div className="space-y-7">
                                <div>
                                    <label className="block text-lg text-gray-200 font-medium mb-3">Preferred Language</label>
                                    <div className="relative">
                                        <select
                                            value={prefs.language}
                                            onChange={(e) => { setPrefs((p) => ({ ...p, language: e.target.value })); setStatus(null); }}
                                            className={`${inputClass} appearance-none cursor-pointer pr-12`}
                                        >
                                            {languages.map((l) => (
                                                <option key={l.value} value={l.value} className="bg-[#0f0f1e]">
                                                    {l.label}
                                                </option>
                                            ))}
                                        </select>
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-lg text-gray-200 font-medium mb-3">Timezone</label>
                                    <div className="relative">
                                        <select
                                            value={prefs.timezone}
                                            onChange={(e) => { setPrefs((p) => ({ ...p, timezone: e.target.value })); setStatus(null); }}
                                            className={`${inputClass} appearance-none cursor-pointer pr-12`}
                                        >
                                            {timezones.map((tz) => (
                                                <option key={tz.value} value={tz.value} className="bg-[#0f0f1e]">
                                                    {tz.label}
                                                </option>
                                            ))}
                                        </select>
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {statusMessage}
                            <FormActions saving={saving} onCancel={cancelGeneric} />
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;