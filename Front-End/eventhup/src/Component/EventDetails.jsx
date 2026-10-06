import { faLocationDot, faStar, faCalendarMinus, faCircleArrowLeft, faUsers, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faClock, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function EventDetails() {
    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [categories, setcategories] = useState([]);
    const [isFavorited, setIsFavorited] = useState(false);
    const [favLoading, setFavLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/api/event/${id}`)
            .then(res => {
                setEvent({
                    ...res.data.event,
                    remaining_seats: res.data.remaining_seats
                });
            })
            .catch(err => console.error(err));

        api.get(`/api/events/${id}/favorite/check`)
            .then(res => {
                setIsFavorited(res.data.favorited);
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleToggleFavorite = () => {
        if (favLoading) return;
        setFavLoading(true);

        api.post(`/api/events/${id}/favorite`, {})
            .then(res => {
                setIsFavorited(res.data.favorited);
            })
            .catch(err => {
                console.error(err);
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            })
            .finally(() => setFavLoading(false));
    };

    if (!event) {
        return <p className="text-white pt-10">Loading...</p>;
    }

    const imgSrc = event.image_path?.startsWith('http')
        ? event.image_path
        : `http://localhost:8000/${event.image_path}`;

    const portimgSrc = event.organizer?.profile_photo?.startsWith('http')
        ? event.organizer.profile_photo
        : `http://localhost:8000/${event.organizer?.profile_photo}`;

    return (
        <div>
            <div className="relative h-[500px]">
                <img className="w-full h-full object-cover" src={imgSrc} alt="" />
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-6 pb-12">
                        <Link to={'/home'} className="flex items-center gap-2 my-5">
                            <FontAwesomeIcon icon={faCircleArrowLeft} />
                            Back To Event
                        </Link>
                        <div className="bg-orange-500/50 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-8 max-w-3xl">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-4 py-1 bg-orange-500/20 text-white-300 rounded-full text-sm">{event.categories?.name || 'General'}</span>
                                <span><FontAwesomeIcon className='w-4 h-4 text-amber-400' icon={faStar} /> {event.evaluation}.0</span>
                            </div>
                            <h2 className="text-4xl text-white mb-4">{event.title}</h2>
                            <div className="flex flex-wrap gap-6 text-gray-300">
                                <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCalendarMinus} className='text-rose-400 w-4 h-4' /> {event.date}</span>
                                <span className="flex items-center gap-2"><FontAwesomeIcon icon={faClock} className='text-blue-400 w-4 h-4' /> {event.time}</span>
                                <span className="flex items-center gap-2"><FontAwesomeIcon icon={faLocationDot} className='text-green-400 w-4 h-4' /> {event.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-8">
                            <h2 className="text-2xl text-white mb-4">Description</h2>
                            <p className="text-gray-300 leading-relaxed">{event.description}</p>
                        </div>
                        <div className="bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-8">
                            <h2 className="text-2xl text-white mb-6">Organizer</h2>
                            <div className="flex items-center gap-4">
                                <img className="w-16 h-16 rounded-full object-cover" src={portimgSrc} alt="" />
                                <div className="flex-1">
                                    <h3>{event.organizer?.name}</h3>
                                    <span className="text-gray-400 text-sm">{event.organizer?.events_count} event</span>
                                </div>
                                <button className="px-6 py-2 bg-orange-500/20 text-orange-300 rounded-xl hover:bg-orange-500/30 transition-colors">View Profile</button>
                            </div>
                        </div>
                        <div className="bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-8">
                            <h2 className="text-2xl text-white mb-6">Location</h2>
                            <div className="bg-[#1a1a2e] rounded-xl h-64 flex items-center justify-center">
                                <FontAwesomeIcon icon={faLocationDot} className='text-orange-400 lucide lucide-map-pin' size="2xl" />
                            </div>
                            <p className="text-gray-300 mt-4">{event.location}</p>
                        </div>
                        <div></div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6">
                            <div className="mb-6">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-3xl text-white">{event.price}</span>
                                    <span className="text-gray-400">par parson</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <FontAwesomeIcon icon={faUsers} className="text-orange-400" />
                                    <span>{event.remaining_seats} seats remaining</span>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all mb-4">Book Ticket</button>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 py-3 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition-colors">
                                    <FontAwesomeIcon icon={faShareNodes} className="lucide lucide-share2 lucide-share-2" /> Share
                                </button>
                                <button
                                    onClick={handleToggleFavorite}
                                    disabled={favLoading}
                                    className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-colors ${
                                        isFavorited
                                            ? 'bg-red-500/20 text-red-500'
                                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                    }`}
                                >
                                    <FontAwesomeIcon icon={isFavorited ? faHeartSolid : faHeart} className={isFavorited ? 'text-red-500' : ''} />
                                    {isFavorited ? 'Saved' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetails;