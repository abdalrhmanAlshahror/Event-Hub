import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTachographDigital,
    faUserGroup,
    faGear,
    faArrowTrendUp,
    faDollarSign,
    faStar,
    faEllipsisVertical,
    faChartColumn,
    faImage,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import api from "../api/axios";

const API_URL = "http://localhost:8000";

const inputClass =
    "w-full bg-[#0f0f1e]/80 border border-rose-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/60 transition-colors";

// تحويل أرقام الـ trend لخط SVG
const buildPath = (values = []) => {
    const list = values.length > 1 ? values : [0, 0];
    const w = 280;
    const h = 50;
    const pad = 6;
    const min = Math.min(...list);
    const max = Math.max(...list);
    const range = max - min;
    const step = (w - 8) / (list.length - 1);

    return list
        .map((v, i) => {
            const x = 4 + i * step;
            const y = range === 0 ? h / 2 : h - pad - ((v - min) / range) * (h - pad * 2);
            return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join(" ");
};

const getErrorMessage = (err) => {
    const msg = err.response?.data?.message;
    if (msg && typeof msg === "object") return Object.values(msg).flat()[0];
    return msg || "Something went wrong";
};

function Modal({ title, onClose, children }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] border-2 border-rose-500/20 rounded-3xl p-7 shadow-2xl shadow-orange-500/10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl text-white font-medium">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                        <FontAwesomeIcon icon={faXmark} size="lg" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

function Dashboard() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("Dashboard");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // التعديل
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({});
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState(null);

    // الحذف
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const menuItems = [
        { name: "Dashboard", icon: faTachographDigital },
        { name: "My Events", icon: faCalendar, path: "/my-events" },
        { name: "Bookings", icon: faUserGroup, path: "/bookings" },
        { name: "Settings", icon: faGear, path: "/settings" },
    ];

    const statusStyles = {
        Active: "bg-emerald-500/15 text-emerald-400",
        Pending: "bg-yellow-500/15 text-yellow-400",
        Ended: "bg-gray-500/15 text-gray-400",
    };

    const loadDashboard = () => {
        api.get("/api/dashboard")
            .then((res) => {
                setData(res.data);
                setError(null);
            })
            .catch((err) => {
                console.error(err);
                if (err.response?.status === 401) {
                    navigate("/login");
                } else if (err.response?.status === 403) {
                    setError("Only organizers can access the dashboard");
                } else {
                    setError("Failed to load the dashboard");
                }
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    // ====== التعديل ======
    const openEdit = (event) => {
        setFormError(null);
        setForm({
            title: event.title,
            description: event.description,
            location: event.location,
            date: event.date,
            time: event.time,
            price: event.price,
            maxcapacity: event.maxcapacity,
            status: event.is_active,
        });
        setEditing(event);
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setSaving(true);
        setFormError(null);

        api.put(`/api/events/${editing.id}`, {
            title: form.title,
            description: form.description,
            location: form.location,
            date: form.date,
            time: form.time,
            price: String(form.price),
            maxcapacity: Number(form.maxcapacity),
            status: form.status,
        })
            .then(() => {
                setEditing(null);
                loadDashboard();
            })
            .catch((err) => setFormError(getErrorMessage(err)))
            .finally(() => setSaving(false));
    };

    // ====== الحذف ======
    const handleDelete = () => {
        setDeleting(true);
        setDeleteError(null);

        api.delete(`/api/events/${deleteTarget.id}`)
            .then(() => {
                setDeleteTarget(null);
                loadDashboard();
            })
            .catch((err) => setDeleteError(getErrorMessage(err)))
            .finally(() => setDeleting(false));
    };

    // ====== حالات التحميل والخطأ ======
    if (loading) {
        return <p className="text-white pt-10 text-center">Loading...</p>;
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center">
                <p className="text-rose-400 text-xl">{error}</p>
                <Link to="/home" className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white">
                    Back to Home
                </Link>
            </div>
        );
    }

    const stats = [
        { label: "Total Events", value: data.stats.total_events, trend: data.trends.events, icon: faCalendar, iconBg: "bg-orange-500/20", iconColor: "text-orange-400" },
        { label: "Total Attendees", value: Number(data.stats.total_attendees).toLocaleString(), trend: data.trends.attendees, icon: faUserGroup, iconBg: "bg-rose-500/20", iconColor: "text-rose-400" },
        { label: "Revenue", value: `$${Number(data.stats.revenue).toLocaleString()}`, trend: data.trends.revenue, icon: faDollarSign, iconBg: "bg-emerald-500/20", iconColor: "text-emerald-400" },
        { label: "Average Rating", value: data.stats.average_rating, trend: data.trends.rating, icon: faStar, iconBg: "bg-yellow-500/20", iconColor: "text-yellow-400" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a]">
            <div className="flex min-h-screen">

                {/* ====== السايد بار ====== */}
                <aside className="w-64 shrink-0 bg-[#0f0f1e]/80 backdrop-blur-xl border-r border-orange-500/20 p-6">
                    <Link to="/home" className="mb-12 block">
                        <h1 className="text-2xl bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent font-bold">EventHub</h1>
                    </Link>
                    <div className="space-y-2">
                        {menuItems.map((item) => {
                            const isActive = activeTab === item.name;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => (item.path ? navigate(item.path) : setActiveTab(item.name))}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer text-left ${
                                        isActive
                                            ? "bg-gradient-to-r from-orange-500/30 to-rose-500/30 text-orange-200"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    <FontAwesomeIcon icon={item.icon} /> {item.name}
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* ====== المحتوى ====== */}
                <main className="flex-1 p-8 overflow-hidden">

                    {/* كروت الإحصائيات */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className="bg-gradient-to-br from-[#1a1a2e]/60 to-[#0f0f1e]/60 border border-rose-500/10 rounded-3xl p-7 transition-all hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/5"
                            >
                                <div className="flex items-start justify-between mb-5">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${stat.iconBg} ${stat.iconColor}`}>
                                        <FontAwesomeIcon icon={stat.icon} />
                                    </div>
                                    <FontAwesomeIcon icon={faArrowTrendUp} className="text-emerald-400" />
                                </div>

                                <h2 className="text-4xl text-white font-medium mb-1 text-left">{stat.value}</h2>
                                <p className="text-gray-400 text-left mb-4">{stat.label}</p>

                                <svg viewBox="0 0 280 50" className="w-full h-12" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id={`spark-${index}`} x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#f97316" />
                                            <stop offset="100%" stopColor="#f43f5e" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d={buildPath(stat.trend)}
                                        fill="none"
                                        stroke={`url(#spark-${index})`}
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                        {/* ====== إدارة الفعاليات ====== */}
                        <div className="xl:col-span-2 bg-gradient-to-br from-[#1a1a2e]/60 to-[#0f0f1e]/60 border border-rose-500/10 rounded-3xl p-7">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl text-white font-medium">Events Management</h2>
                                <button className="text-orange-400 hover:text-orange-300 transition-colors cursor-pointer">
                                    <FontAwesomeIcon icon={faChartColumn} />
                                </button>
                            </div>

                            {data.events.length === 0 && (
                                <div className="text-center py-10">
                                    <p className="text-gray-400 mb-4">You don't have any events yet</p>
                                    <Link
                                        to="/create-event"
                                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold"
                                    >
                                        Create your first event
                                    </Link>
                                </div>
                            )}

                            <div className="space-y-4">
                                {data.events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-center gap-4 p-5 bg-[#0f0f1e]/60 border border-white/5 rounded-2xl transition-all hover:border-orange-500/30"
                                    >
                                        {event.image_path ? (
                                            <img
                                                src={`${API_URL}/${event.image_path}`}
                                                alt={event.title}
                                                className="w-20 h-20 rounded-xl object-cover"
                                                onError={(e) => { e.currentTarget.style.display = "none"; }}
                                            />
                                        ) : (
                                            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-orange-500/30 to-rose-500/30 flex items-center justify-center text-orange-300 text-2xl">
                                                <FontAwesomeIcon icon={faImage} />
                                            </div>
                                        )}

                                        <div className="flex-1 text-left">
                                            <h3 className="text-xl text-white font-medium mb-1">{event.title}</h3>
                                            <div className="flex items-center gap-5 text-gray-400">
                                                <span className="flex items-center gap-2">
                                                    <FontAwesomeIcon icon={faUserGroup} className="text-sm" /> {event.attendees}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FontAwesomeIcon icon={faDollarSign} className="text-sm" /> {Number(event.revenue).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>

                                        <span className={`px-3 py-1 rounded-full text-sm ${statusStyles[event.status]}`}>
                                            {event.status}
                                        </span>

                                        <div className="flex items-center gap-4 text-lg">
                                            <button
                                                onClick={() => openEdit(event)}
                                                className="text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button
                                                onClick={() => { setDeleteError(null); setDeleteTarget(event); }}
                                                className="text-rose-500 hover:text-rose-400 transition-colors cursor-pointer"
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                            <button className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ====== آخر النشاطات ====== */}
                        <div className="xl:col-span-1 bg-gradient-to-br from-[#1a1a2e]/60 to-[#0f0f1e]/60 border border-rose-500/10 rounded-3xl p-7 self-start">
                            <h2 className="text-2xl text-white font-medium mb-6 text-left">Recent Activity</h2>

                            {data.activities.length === 0 && (
                                <p className="text-gray-500 text-left">No bookings yet</p>
                            )}

                            <div className="space-y-4">
                                {data.activities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-start gap-4 p-4 bg-[#0f0f1e]/60 border border-white/5 rounded-2xl transition-all hover:border-orange-500/30"
                                    >
                                        <div className="w-10 h-10 shrink-0 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center">
                                            <FontAwesomeIcon icon={faUserGroup} />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-white">
                                                New booking for <span className="text-orange-400">{activity.event}</span>
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {activity.user} · {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* ====== نافذة التعديل ====== */}
            {editing && (
                <Modal title="Edit Event" onClose={() => setEditing(null)}>
                    <form onSubmit={handleSave} className="space-y-4 text-left">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Title</label>
                            <input name="title" value={form.title} onChange={handleFormChange} maxLength={50} className={inputClass} required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Description</label>
                            <textarea name="description" value={form.description} onChange={handleFormChange} rows={3} className={inputClass} required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Location</label>
                            <input name="location" value={form.location} onChange={handleFormChange} className={inputClass} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Date</label>
                                <input type="date" name="date" value={form.date} onChange={handleFormChange} className={inputClass} required />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Time</label>
                                <input type="time" name="time" value={form.time} onChange={handleFormChange} className={inputClass} required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Price</label>
                                <input name="price" value={form.price} onChange={handleFormChange} className={inputClass} required />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Max capacity</label>
                                <input type="number" min="1" name="maxcapacity" value={form.maxcapacity} onChange={handleFormChange} className={inputClass} required />
                            </div>
                        </div>
                        <label className="flex items-center gap-3 cursor-pointer text-gray-300">
                            <input type="checkbox" name="status" checked={form.status} onChange={handleFormChange} className="w-5 h-5 accent-orange-500" />
                            Event is active (visible to everyone)
                        </label>

                        {formError && <p className="text-rose-400 text-sm">{formError}</p>}

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setEditing(null)}
                                className="flex-1 py-3 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/40 transition-all cursor-pointer disabled:opacity-60"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* ====== نافذة الحذف ====== */}
            {deleteTarget && (
                <Modal title="Delete Event" onClose={() => setDeleteTarget(null)}>
                    <p className="text-gray-300 text-left mb-2">
                        Are you sure you want to delete{" "}
                        <span className="text-orange-400 font-medium">{deleteTarget.title}</span>?
                    </p>
                    <p className="text-gray-500 text-sm text-left mb-6">
                        All its bookings will be deleted too. This can't be undone.
                    </p>

                    {deleteError && <p className="text-rose-400 text-sm mb-4">{deleteError}</p>}

                    <div className="flex gap-3">
                        <button
                            onClick={() => setDeleteTarget(null)}
                            className="flex-1 py-3 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-semibold hover:shadow-lg hover:shadow-rose-500/40 transition-all cursor-pointer disabled:opacity-60"
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Dashboard;