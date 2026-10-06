import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSliders, faStar, faLaptop, faPalette, faBriefcase, faMusic, faMasksTheater, faFutbol, faX, faDollarSign } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-regular-svg-icons"
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Cardto";

function ExplorEvent() {

    const [value, setValue] = useState(500);
    const max = 500;
    const percent = (value / max) * 100;

    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        { name: "Technology", icon: faLaptop, iconClass: "text-purple-600" },
        { name: "Design", icon: faPalette, iconClass: "text-rose-600" },
        { name: "Business", icon: faBriefcase, iconClass: "text-orange-600" },
        { name: "Music", icon: faMusic, iconClass: "text-yellow-600" },
        { name: "Art & Culture", icon: faMasksTheater, iconClass: "text-red-600" },
        { name: "Sport", icon: faFutbol, iconClass: "bg-white rounded-3xl text-black" },
    ];

    const [selectedDate, setSelectedDate] = useState(null);

    const dates = [
        { name: "Today" },
        { name: "This Week" },
        { name: "This Month" },
    ];

    const [fourStarsOnly, setFourStarsOnly] = useState(false);

    const [cards, setCard] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8000/api/events')
        .then(response => {
            setCard(response.data.Event);
            console.log(response.data.Event[0]); // مؤقت: لتشوف شكل الداتا، فيك تشيله بعدين
        })
        .catch(error => {
            console.error("حدث خطأ أثناء جلب البيانات:", error);
        });
    }, []);

    const getCategoryName = (event) => {
        const cat = event.categories ?? event.Categories;
        return Array.isArray(cat) ? cat[0]?.name : cat?.name;
    };

    // تحويل تاريخ الفعالية لتاريخ محلي (بدون مشاكل التوقيت)
    const parseDate = (dateString) => {
        const [y, m, d] = dateString.split("T")[0].split("-").map(Number);
        return new Date(y, m - 1, d);
    };

    const matchesDate = (event) => {
        if (!selectedDate) return true;

        const eventDate = parseDate(event.date);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (selectedDate === "Today") {
            return eventDate.getTime() === today.getTime();
        }

        if (selectedDate === "This Week") {
            // الأسبوع من الاثنين للأحد
            const dayOfWeek = (today.getDay() + 6) % 7;
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - dayOfWeek);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            return eventDate >= startOfWeek && eventDate <= endOfWeek;
        }

        if (selectedDate === "This Month") {
            return (
                eventDate.getFullYear() === today.getFullYear() &&
                eventDate.getMonth() === today.getMonth()
            );
        }

        return true;
    };

    const filteredCards = cards.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            !selectedCategory ||
            getCategoryName(event)?.trim().toLowerCase() === selectedCategory.trim().toLowerCase();

        const matchesPrice = (Number(event.price) || 0) <= value;

        const matchesRating = !fourStarsOnly || Number(event.evaluation) >= 4;

        return matchesSearch && matchesCategory && matchesPrice && matchesDate(event) && matchesRating;
    });

    return(
        <div>
            {/* CSS تبع السلايدر (الدائرة) - فيك تنقله لملف الـ CSS إذا بدك */}
            <style>{`
                .price-slider {
                    outline: none;
                }

                /* Chrome / Safari / Edge */
                .price-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 26px;
                    height: 26px;
                    border-radius: 50%;
                    background: #f97316;
                    border: 3px solid #fdba74;
                    box-shadow: 0 0 12px rgba(249, 115, 22, 0.8);
                    cursor: pointer;
                    transition: transform 0.15s;
                }
                .price-slider::-webkit-slider-thumb:hover {
                    transform: scale(1.1);
                }

                /* Firefox */
                .price-slider::-moz-range-thumb {
                    width: 26px;
                    height: 26px;
                    border-radius: 50%;
                    background: #f97316;
                    border: 3px solid #fdba74;
                    box-shadow: 0 0 12px rgba(249, 115, 22, 0.8);
                    cursor: pointer;
                }
            `}</style>

            <div className="container mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-orange-200 to-blue-200 bg-clip-text text-transparent text-center animate-gradient">Start Exploring</h1>
                    <p className="text-xl text-center text-gray-400 mb-8">Discover amazing events tailored just for you</p>
                    <div className="max-w-4xl mx-auto">
                        <div className="relative group">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="lucide lucide-search absolute left-6 top-1/2 -translate-y-1/2 text-orange-400 z-10" size="xl" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-[#1a1a2e]/90 backdrop-blur-2xl border-2 border-rose-500/30 rounded-2xl pl-16 pr-24 py-7 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 transition-all shadow-lg shadow-rose-500/5 group-hover:shadow-rose-500/10"
                                placeholder="Search for event"
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 px-5 py-3 bg-gradient-to-r from-orange-500 to-rose-500 backdrop-rose-xl text-white-200 rounded-xl hover:from-orange-500/40 hover:to-rose-500/40 transition-all flex items-center gap-2 border border-orange-500/30 shadow-lg shadow-orange-500/20"><FontAwesomeIcon icon={faSliders} /> Filters</button>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                            {categories.map((cat) => {
                                const isActive = selectedCategory === cat.name;
                                return (
                                    <button
                                        key={cat.name}
                                        onClick={() => setSelectedCategory(isActive ? null : cat.name)}
                                        className={`group px-7 py-4 rounded-2xl backdrop-blur-xl border-2 transition-all transform hover:scale-105 ${
                                            isActive
                                                ? "bg-gradient-to-r from-orange-600/80 to-rose-600/80 border-orange-400/70 text-white shadow-lg shadow-orange-500/40"
                                                : "bg-[#1a1a2e]/60 border-rose-500/20 text-gray-300 hover:bg-[#1a1a2e]/80 hover:border-rose-400/40 hover:shadow-lg"
                                        }`}
                                    >
                                        <FontAwesomeIcon className={`text-2xl mr-3 ${cat.iconClass}`} icon={cat.icon} />
                                        <span className="font-medium">{cat.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex gap-8 mt-12 items-start">
                        <div className="w-80 shrink-0 animate-in slide-in-from-left duration-300">
                            <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1e]/80 backdrop-rose-2xl border-2 border-rose-500/20 rounded-3xl p-7 sticky top-24 shadow-2xl shadow-rose-500/10">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-2xl text-white text-left font-semibold mb-1">Filters</h3>
                                        <p className="text-sm text-gray-400">Refine your search</p>
                                    </div>
                                    <span className="p-2.5 hover:bg-white/10 rounded-xl transition-colors group"><FontAwesomeIcon className="lucide lucide-x text-gray-400 group-hover:text-white transition-colors" icon={faX} /></span>
                                </div>
                                <div className="mb-10">
                                    <h4 className="text-white text-lg font-medium mb-5 flex items-center gap-2"><FontAwesomeIcon className="text-orange-600" icon={faDollarSign} /> Price Range</h4>
                                    <div className="space-y-5">
                                        <div className="relative">
                                            <input
                                                type="range"
                                                min="0"
                                                max={max}
                                                value={value}
                                                onChange={(e) => setValue(Number(e.target.value))}
                                                className="price-slider w-full h-3 rounded-full appearance-none cursor-pointer"
                                                style={{
                                                    background: `linear-gradient(to right, #be123c 0%, #f97316 ${percent}%, #374151 ${percent}%, #374151 100%)`,
                                                }}
                                            />
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="px-4 py-2 bg-[#0f0f1e]/80 rounded-xl border border-orange-500/70">
                                                    <span className="text-xs text-gray-400">Min</span>
                                                    <p className="text-white font-semibold">$0</p>
                                                </div>
                                                <div className="text-gray-500">—</div>
                                                <div className="px-4 py-2 bg-gradient-to-r from-orange-500/70 to-rose-500/70 rounded-xl border border-orange-400/70">
                                                    <span className="text-xs text-purple-300">Max</span>
                                                    <p className="text-white font-semibold">${value}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-10">
                                    <h3 className="text-left mb-3"><FontAwesomeIcon className="text-blue-500" icon={faCalendar} /> Date Range</h3>
                                    <div className="space-y-3">
                                        {dates.map((d) => {
                                            const isActive = selectedDate === d.name;
                                            return (
                                                <button
                                                    key={d.name}
                                                    onClick={() => setSelectedDate(isActive ? null : d.name)}
                                                    className={`w-full px-5 py-4 rounded-xl text-left transition-all font-medium border-2 ${
                                                        isActive
                                                            ? "bg-gradient-to-r from-orange-600/80 to-rose-600/80 border-orange-400/70 text-white shadow-lg shadow-orange-500/40"
                                                            : "bg-[#0f0f1e]/60 text-gray-400 hover:bg-[#0f0f1e]/80 border-transparent hover:border-orange-500/20"
                                                    }`}
                                                >
                                                    <FontAwesomeIcon icon={faCalendar} /> {d.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="text-left">
                                    <h3><FontAwesomeIcon className="text-yellow-300 mr-2" icon={faStar} />Rating</h3>
                                    <label className="flex mt-3 items-center gap-4 cursor-pointer p-5 bg-gradient-to-br from-[#0f0f1e]/70 to-[#0f0f1e]/50 rounded-xl border-2 border-rose-500/20 hover:border-yellow-500/40 transition-all group">
                                        <input
                                            type="checkbox"
                                            checked={fourStarsOnly}
                                            onChange={(e) => setFourStarsOnly(e.target.checked)}
                                            className="w-6 h-6 rounded-lg border-2 border-orange-500/40 bg-[#1a1a2e] accent-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all cursor-pointer"
                                        />
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className="flex items-center gap-1">
                                                <FontAwesomeIcon className="text-yellow-300" icon={faStar} />
                                                <FontAwesomeIcon className="text-yellow-300" icon={faStar} />
                                                <FontAwesomeIcon className="text-yellow-300" icon={faStar} />
                                                <FontAwesomeIcon className="text-yellow-300" icon={faStar} />
                                                <FontAwesomeIcon className="text-yellow-300" icon={faStar} />
                                            </div>
                                            <span className="text-white font-medium group-hover:text-orange-200 transition-colors">4 stars & up </span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* الفعاليات */}
                        <div className="flex-1">
                            {filteredCards.length === 0 && (
                                <p className="text-gray-400 text-lg mt-10">No events found</p>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredCards.slice(0, 9).map((event) => (
                                    <Card key={event.id} data={event} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExplorEvent;