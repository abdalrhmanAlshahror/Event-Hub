import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faLocationDot,
    faDownload,
    faAngleRight,
    faImage,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";
import api from "../api/axios";

const API_URL = "http://localhost:8000";

const formatDate = (dateString) => {
    const [y, m, d] = dateString.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};

const formatTime = (time) => {
    if (!time) return "";
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, "0")} ${period}`;
};

// صورة الـ QR (بتتولّد من رقم الحجز)
function QrImage({ value }) {
    const [src, setSrc] = useState("");

    useEffect(() => {
        QRCode.toDataURL(value, { margin: 1, width: 300 })
            .then(setSrc)
            .catch((err) => console.error(err));
    }, [value]);

    return src ? <img src={src} alt="QR code" className="w-full h-full" /> : null;
}

function MyBookings() {
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [tab, setTab] = useState("upcoming");
    const [search, setSearch] = useState("");
    const [downloadingId, setDownloadingId] = useState(null);

    useEffect(() => {
        api.get("/api/my-bookings")
            .then((res) => setData(res.data))
            .catch((err) => {
                console.error(err);
                if (err.response?.status === 401) {
                    navigate("/login");
                } else {
                    setError("Failed to load your bookings");
                }
            })
            .finally(() => setLoading(false));
    }, []);

    // ====== تحميل التذكرة PDF ======
    const downloadPdf = async (booking) => {
        setDownloadingId(booking.id);

        try {
            const qr = await QRCode.toDataURL(booking.code, { margin: 1, width: 400 });
            const doc = new jsPDF({ unit: "pt", format: "a4" });
            const pageWidth = doc.internal.pageSize.getWidth();

            // الهيدر
            doc.setFillColor(249, 115, 22);
            doc.rect(0, 0, pageWidth, 110, "F");
            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(30);
            doc.text("EventHub", 40, 62);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(13);
            doc.text("Event Ticket", 40, 88);

            // اسم الفعالية
            doc.setTextColor(20, 20, 30);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(24);
            const titleLines = doc.splitTextToSize(booking.event.title, pageWidth - 80);
            doc.text(titleLines, 40, 165);

            // التفاصيل
            let y = 165 + titleLines.length * 30 + 20;
            const details = [
                ["Date", formatDate(booking.event.date)],
                ["Time", formatTime(booking.event.time)],
                ["Location", booking.event.location],
            ];

            details.forEach(([label, value]) => {
                doc.setFont("helvetica", "normal");
                doc.setFontSize(11);
                doc.setTextColor(120, 120, 130);
                doc.text(label.toUpperCase(), 40, y);

                doc.setFont("helvetica", "bold");
                doc.setFontSize(15);
                doc.setTextColor(20, 20, 30);
                const lines = doc.splitTextToSize(value || "-", pageWidth - 80);
                doc.text(lines, 40, y + 20);
                y += 20 + lines.length * 18 + 18;
            });

            // خط منقّط
            doc.setDrawColor(200, 200, 210);
            doc.setLineDashPattern([5, 4], 0);
            doc.line(40, y + 5, pageWidth - 40, y + 5);
            doc.setLineDashPattern([], 0);

            // QR ورقم الحجز
            const qrSize = 190;
            doc.addImage(qr, "PNG", (pageWidth - qrSize) / 2, y + 30, qrSize, qrSize);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            doc.setTextColor(120, 120, 130);
            doc.text("BOOKING ID", pageWidth / 2, y + 255, { align: "center" });

            doc.setFont("courier", "bold");
            doc.setFontSize(18);
            doc.setTextColor(249, 115, 22);
            doc.text(booking.code, pageWidth / 2, y + 278, { align: "center" });

            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(150, 150, 160);
            doc.text("Please show this QR code at the entrance.", pageWidth / 2, y + 310, { align: "center" });

            doc.save(`${booking.code}.pdf`);
        } catch (err) {
            console.error(err);
        } finally {
            setDownloadingId(null);
        }
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
    const filtered = list.filter((b) =>
        b.event.title.toLowerCase().includes(search.toLowerCase())
    );

    const tabs = [
        { key: "upcoming", label: "Upcoming" },
        { key: "past", label: "Past" },
    ];

    return (
        <div className="container mx-auto px-6 py-30 text-left">
            <h1 className="text-5xl font-bold text-white mb-8">My Bookings</h1>

            {/* ====== البحث ====== */}
            <div className="relative max-w-3xl mb-10">
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-400"
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by event name..."
                    className="w-full bg-[#1a1a2e]/90 border-2 border-rose-500/30 rounded-2xl pl-14 pr-6 py-5 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 transition-all shadow-lg shadow-rose-500/5"
                />
            </div>

            {/* ====== التبويبات ====== */}
            <div className="flex gap-10 border-b border-white/10 mb-8">
                {tabs.map((t) => {
                    const isActive = tab === t.key;
                    return (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={`relative pb-4 text-lg font-medium transition-colors cursor-pointer ${
                                isActive ? "text-orange-400" : "text-gray-400 hover:text-white"
                            }`}
                        >
                            {t.label} <span className="text-sm opacity-70">({data[t.key].length})</span>
                            {isActive && (
                                <span className="absolute left-0 right-0 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* ====== فاضي ====== */}
            {filtered.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-400 text-lg mb-6">
                        {list.length === 0
                            ? tab === "upcoming"
                                ? "You have no upcoming bookings"
                                : "You have no past bookings"
                            : "No bookings match your search"}
                    </p>
                    {list.length === 0 && tab === "upcoming" && (
                        <Link to="/explore" className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold">
                            Explore events
                        </Link>
                    )}
                </div>
            )}

            {/* ====== التذاكر ====== */}
            <div className="space-y-8">
                {filtered.map((booking) => (
                    <div
                        key={booking.id}
                        className={`flex flex-col lg:flex-row bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1e]/80 border-2 border-rose-500/20 rounded-3xl overflow-hidden transition-all hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10 ${
                            tab === "past" ? "opacity-80" : ""
                        }`}
                    >
                        {/* معلومات الفعالية */}
                        <div className="flex-1 flex items-center gap-6 p-8">
                            {booking.event.image_path ? (
                                <img
                                    src={`${API_URL}/${booking.event.image_path}`}
                                    alt={booking.event.title}
                                    className="w-28 h-28 rounded-2xl object-cover shrink-0"
                                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                                />
                            ) : (
                                <div className="w-28 h-28 rounded-2xl shrink-0 bg-gradient-to-br from-orange-500/30 to-rose-500/30 flex items-center justify-center text-orange-300 text-3xl">
                                    <FontAwesomeIcon icon={faImage} />
                                </div>
                            )}

                            <div>
                                <h2 className="text-3xl text-white font-medium mb-4">{booking.event.title}</h2>
                                <div className="space-y-2 text-gray-300">
                                    <p className="flex items-center gap-3">
                                        <FontAwesomeIcon icon={faCalendar} className="text-orange-400 w-4" />
                                        {formatDate(booking.event.date)}
                                    </p>
                                    {booking.event.time && (
                                        <p className="flex items-center gap-3">
                                            <FontAwesomeIcon icon={faClock} className="text-blue-400 w-4" />
                                            {formatTime(booking.event.time)}
                                        </p>
                                    )}
                                    <p className="flex items-center gap-3">
                                        <FontAwesomeIcon icon={faLocationDot} className="text-rose-400 w-4" />
                                        {booking.event.location}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* QR والأزرار */}
                        <div className="lg:w-96 shrink-0 flex flex-col items-center p-8 border-t-2 lg:border-t-0 lg:border-l-2 border-dashed border-orange-500/30">
                            <div className="w-40 h-40 bg-white rounded-2xl p-3 mb-4">
                                <QrImage value={booking.code} />
                            </div>

                            <p className="text-sm text-gray-400">Booking ID</p>
                            <p className="font-mono text-orange-400 mb-5">{booking.code}</p>

                            <button
                                onClick={() => downloadPdf(booking)}
                                disabled={downloadingId === booking.id}
                                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white text-lg font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all cursor-pointer disabled:opacity-60"
                            >
                                <FontAwesomeIcon icon={faDownload} />
                                {downloadingId === booking.id ? "Preparing..." : "Download PDF"}
                            </button>

                            <Link
                                to={`/event/${booking.event.id}`}
                                className="mt-5 flex items-center gap-2 text-gray-400 hover:text-orange-300 transition-colors"
                            >
                                View Details <FontAwesomeIcon icon={faAngleRight} className="text-sm" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyBookings;