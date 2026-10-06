import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8000";

function Card({ data }) {
    const rating = Number(data.evaluation) || 0;
    const isFree = !data.price || Number(data.price) === 0;
    const organizer = data.organizer;

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    
    const imgSrc = data.image_path?.startsWith('http') 
        ? data.image_path 
        : `http://localhost:8000/${data.image_path}`;

    return (
        <div className="group bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1e]/80 border-2 border-rose-500/20 rounded-3xl overflow-hidden text-left transition-all duration-300 hover:border-orange-500/60 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-1">

            {/* الصورة */}
            <div className="relative h-64 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] overflow-hidden">
                <img 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        src={imgSrc}
                        alt={data.title}        
                    />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1e] via-transparent to-transparent" />

                {/* طبقة غامقة وقت الهوفير */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* السعر */}
                <span
                    className={`absolute top-4 right-4 px-4 py-1.5 rounded-xl font-bold text-white border shadow-lg ${
                        isFree
                            ? "bg-gradient-to-r from-emerald-600 to-emerald-500 border-emerald-400/50 shadow-emerald-500/30"
                            : "bg-gradient-to-r from-orange-500 to-rose-500 border-orange-400/50 shadow-orange-500/30"
                    }`}
                >
                    {isFree ? "Free" : `$${data.price}`}
                </span>

                {/* زر Quick Book وقت الهوفير */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Link to={`/event/${data.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xl font-bold flex items-center gap-3 border border-orange-300/40 shadow-lg shadow-orange-500/40 hover:scale-105 transition-transform cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faWandMagicSparkles} />
                        Book
                    </Link>
                </div>
            </div>

            {/* المحتوى */}
            <div className="p-7">
                <h3 className="text-2xl font-bold text-white mb-5 transition-colors duration-300 group-hover:text-orange-200">
                    {data.title}
                </h3>

                {/* المنظّم */}
                {organizer && (
                    <div className="flex items-center gap-3 p-3 mb-5 bg-[#0f0f1e]/60 rounded-xl border border-rose-500/20">
                        {organizer.profile_photo ? (
                            <img
                                src={`${API_URL}/${organizer.profile_photo}`}
                                alt={organizer.name}
                                className="w-11 h-11 rounded-full object-cover border-2 border-orange-500/50"
                            />
                        ) : (
                            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 flex items-center justify-center text-white font-bold border-2 border-orange-500/50">
                                {organizer.name?.charAt(0)}
                            </div>
                        )}
                        <div>
                            <p className="text-xs text-gray-500">Hosted by</p>
                            <p className="text-gray-200 font-medium">{organizer.name}</p>
                        </div>
                    </div>
                )}

                {/* التقييم */}
                <div className="flex items-center gap-3 px-4 py-3 mb-5 bg-gradient-to-r from-orange-500/10 to-rose-500/10 rounded-xl border border-orange-500/20">
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <FontAwesomeIcon
                                key={i}
                                icon={faStar}
                                className={i <= rating ? "text-yellow-300" : "text-gray-600"}
                            />
                        ))}
                    </div>
                    <span className="text-yellow-200 font-semibold">
                        {rating > 0 ? rating.toFixed(1) : "No rating"}
                    </span>
                    {data.reviews_count > 0 && (
                        <span className="text-sm text-gray-400">({data.reviews_count} reviews)</span>
                    )}
                </div>

                {/* التاريخ والمكان */}
                <div className="pt-5 border-t border-white/5 space-y-3">
                    <div className="flex items-center gap-3 text-gray-400">
                        <FontAwesomeIcon className="text-orange-500" icon={faCalendar} />
                        <span>{formatDate(data.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                        <FontAwesomeIcon className="text-rose-500" icon={faLocationDot} />
                        <span>{data.location}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
