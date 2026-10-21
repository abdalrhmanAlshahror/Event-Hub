import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisVertical,
    faUserGroup,
    faArrowTrendUp,
    faPlus,
    faXmark,
    faImage,
    faEye,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import api from "../api/axios";

const API_URL = "http://localhost:8000";

const inputClass =
    "w-full bg-[#0f0f1e]/80 border border-rose-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/60 transition-colors";

const statusStyles = {
    "Active": "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
    "Pending Approval": "bg-orange-500/15 text-orange-300 border-orange-500/40",
    "Past Events": "bg-gray-500/20 text-gray-300 border-gray-500/40",
};

const filters = ["All", "Active", "Pending Approval", "Past Events"];

const formatDate = (dateString) => {
    const [y, m, d] = dateString.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
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

function MyEvents() {
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [tab, setTab] = useState("created");
    const [filter, setFilter] = useState("All");
    const [openMenu, setOpenMenu] = useState(null);

    // التعديل
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({});
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState(null);

    // الحذف
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    // إلغاء الحجز
    const [cancelTarget, setCancelTarget] = useState(null);
    const [canceling, setCanceling] = useState(false);
    const [cancelError, setCancelError] = useState(null);

    const loadData = (initial = false) => {
        api.get("/api/my-events")
            .then((res) => {
                setData(res.data);
                setError(null);
                // المستخدم العادي بيبدأ بتبويب Attending
                if (initial && res.data.role === "attendee") setTab("attending");
            })
            .catch((err) => {
                console.error(err);
                if (err.response?.status === 401) {
                    navigate("/login");
                } else {
                    setError("Failed to load your events");
                }
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadData(true);
    }, []);

    // سكّر قائمة النقاط الثلاث لما تكبس برّا
    useEffect(() => {
        const close = () => setOpenMenu(null);
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
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
                loadData();
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
                loadData();
            })
            .catch((err) => setDeleteError(getErrorMessage(err)))
            .finally(() => setDeleting(false));
    };

    // ====== إلغاء الحجز ======
    const handleCancelBooking = () => {
        setCanceling(true);
        setCancelError(null);

        api.delete(`/api/events/${cancelTarget.id}/book`)
            .then(() => {
                setCancelTarget(null);
                loadData();
            })
            .catch((err) => setCancelError(getErrorMessage(err)))
            .finally(() => setCanceling(false));
    };

    if (loading) {
        return <p className="text-white pt-10 text-center">Loading...</p>;
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
                <p className="text-rose-400 text-xl">{error}</p>
                <Link to="/home" className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white">
                    Back to Home
                </Link>
            </div>
        );
    }

    const list = data[tab];
    const filtered = filter === "All" ? list : list.filter((e) => e.status === filter);
    const canCreate = data.role !== "attendee";

    return (
        <div className="container mx-auto px-6 py-30">

            {/* ====== العنوان والتبويبات ====== */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h1 className="text-5xl font-bold text-white">My Events</h1>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex bg-[#1a1a2e]/60 border border-rose-500/20 rounded-2xl p-1.5">
                        {[
                            { key: "created", label: "Created Events" },
                            { key: "attending", label: "Attending Events" },
                        ].map((t) => (
                            <button
                                key={t.key}
                                onClick={() => { setTab(t.key); setFilter("All"); }}
                                className={`px-6 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                                    tab === t.key
                                        ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/30"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {canCreate && (
                        <Link
                            to="/create-event"
                            className="flex items-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
                        >
                            <FontAwesomeIcon icon={faPlus} /> Create Event
                        </Link>
                    )}
                </div>
            </div>

            {/* ====== فلاتر الحالة ====== */}
            <div className="flex flex-wrap gap-3 mb-8">
                {filters.map((f) => {
                    const count = f === "All" ? list.length : list.filter((e) => e.status === f).length;
                    const isActive = filter === f;
                    return (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-3 rounded-2xl border transition-all cursor-pointer ${
                                isActive
                                    ? "bg-gradient-to-r from-orange-500/30 to-rose-500/30 border-orange-400/60 text-orange-200 shadow-lg shadow-orange-500/10"
                                    : "bg-[#1a1a2e]/60 border-transparent text-gray-400 hover:text-white hover:border-orange-500/20"
                            }`}
                        >
                            {f} <span className="text-sm opacity-70">({count})</span>
                        </button>
                    );
                })}
            </div>

            {/* ====== فاضي ====== */}
            {filtered.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-400 text-lg mb-6">
                        {list.length === 0
                            ? tab === "created"
                                ? "You haven't created any events yet"
                                : "You haven't booked any events yet"
                            : "No events match this filter"}
                    </p>
                    {list.length === 0 && tab === "created" && canCreate && (
                        <Link to="/create-event" className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold">
                            Create your first event
                        </Link>
                    )}
                    {list.length === 0 && tab === "attending" && (
                        <Link to="/explore" className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold">
                            Explore events
                        </Link>
                    )}
                </div>
            )}

            {/* ====== الكروت ====== */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filtered.map((event) => (
                    <div
                        key={event.id}
                        className="group relative bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1e]/80 border-2 border-rose-500/20 rounded-3xl overflow-hidden text-left transition-all duration-300 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10"
                    >
                        {/* الصورة */}
                        <div className="relative h-60 bg-gradient-to-br from-orange-500/20 to-rose-500/20">
                            {event.image_path ? (
                                <img
                                    src={`${API_URL}/${event.image_path}`}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-orange-300 text-4xl">
                                    <FontAwesomeIcon icon={faImage} />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1e]/60 via-transparent to-transparent" />

                            {/* زر النقاط الثلاث */}
                            <div className="absolute top-5 left-5">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenMenu(openMenu === event.id ? null : event.id);
                                    }}
                                    className="w-11 h-11 rounded-xl bg-black/60 backdrop-blur-md text-white hover:bg-orange-500/80 transition-colors flex items-center justify-center cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>

                                {openMenu === event.id && (
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="absolute top-13 left-0 mt-2 w-48 bg-[#0f0f1e] border border-rose-500/30 rounded-xl p-2 shadow-xl shadow-black/50 z-20"
                                    >
                                        <Link
                                            to={`/event/${event.id}`}
                                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                        >
                                            <FontAwesomeIcon icon={faEye} className="text-orange-400" /> View details
                                        </Link>

                                        {tab === "created" && (
                                            <>
                                                <button
                                                    onClick={() => { setOpenMenu(null); openEdit(event); }}
                                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-left"
                                                >
                                                    <FontAwesomeIcon icon={faPenToSquare} className="text-orange-400" /> Edit
                                                </button>
                                                <button
                                                    onClick={() => { setOpenMenu(null); setDeleteError(null); setDeleteTarget(event); }}
                                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer text-left"
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} /> Delete
                                                </button>
                                            </>
                                        )}

                                        {tab === "attending" && event.status !== "Past Events" && (
                                            <button
                                                onClick={() => { setOpenMenu(null); setCancelError(null); setCancelTarget(event); }}
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer text-left"
                                            >
                                                <FontAwesomeIcon icon={faXmark} /> Cancel booking
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* الحالة */}
                            <span className={`absolute top-5 right-5 px-4 py-1.5 rounded-full text-sm border backdrop-blur-md ${statusStyles[event.status]}`}>
                                {event.status}
                            </span>
                        </div>

                        {/* المحتوى */}
                        <div className="p-7">
                            <Link to={`/event/${event.id}`}>
                                <h3 className="text-2xl text-white font-medium mb-2 transition-colors group-hover:text-orange-200">
                                    {event.title}
                                </h3>
                            </Link>
                            <p className="text-gray-400 mb-6">{formatDate(event.date)}</p>

                            <div className="flex items-center justify-between mb-3">
                                <span className="text-gray-300">Tickets Sold</span>
                                <span className="text-orange-400 font-medium">
                                    {event.tickets_sold} / {event.maxcapacity}
                                </span>
                            </div>

                            <div className="h-2 rounded-full bg-gray-700/60 overflow-hidden mb-6">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-rose-500 transition-all duration-500"
                                    style={{ width: `${event.percent}%` }}
                                />
                            </div>

                            <div className="pt-5 border-t border-white/5 flex items-center gap-6 text-gray-300">
                                <span className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faUserGroup} className="text-orange-400" /> {event.tickets_sold}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faArrowTrendUp} className="text-emerald-400" /> {event.percent}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
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

            {/* ====== نافذة إلغاء الحجز ====== */}
            {cancelTarget && (
                <Modal title="Cancel Booking" onClose={() => setCancelTarget(null)}>
                    <p className="text-gray-300 text-left mb-6">
                        Do you want to cancel your booking for{" "}
                        <span className="text-orange-400 font-medium">{cancelTarget.title}</span>?
                    </p>

                    {cancelError && <p className="text-rose-400 text-sm mb-4">{cancelError}</p>}

                    <div className="flex gap-3">
                        <button
                            onClick={() => setCancelTarget(null)}
                            className="flex-1 py-3 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            Keep it
                        </button>
                        <button
                            onClick={handleCancelBooking}
                            disabled={canceling}
                            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-semibold hover:shadow-lg hover:shadow-rose-500/40 transition-all cursor-pointer disabled:opacity-60"
                        >
                            {canceling ? "Cancelling..." : "Cancel Booking"}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default MyEvents;