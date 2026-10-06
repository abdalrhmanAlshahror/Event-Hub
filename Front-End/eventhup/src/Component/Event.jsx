import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card"; 
import '../index.css';

function FeaturedEvents() {
    const [cards, setCard] = useState([]); 
    const [visibleCount, setVisibleCount] = useState(9);

    useEffect(() => {
        axios.get('http://localhost:8000/api/events')
        .then(response => {
            setCard(response.data.Event);
        })
        .catch(error => {
            console.error("حدث خطأ أثناء جلب البيانات:", error);
        });
    }, []);

    const handleShowMore = () => {
        setVisibleCount(cards.length);
    };

    return (
        <div className="min-h-screen text-white p-6">
            <div className="mx-auto text-center mt-20">
                <h1 className="font-bold text-5xl mb-3">Featured Events</h1>
                <p className="text-xl text-gray-400">Discover the most popular events happening around you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-35">
                {cards.slice(0, visibleCount).map((event) => (
                    <Card key={event.id} data={event} />
                ))}
            </div>

            
            {cards.length > visibleCount && (
                <div className="text-center mt-12 mb-10">
                    <button 
                        onClick={handleShowMore}
                        className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 cursor-pointer"
                    >
                        Show More
                    </button>
                </div>
            )}
        </div>
    );
}

export default FeaturedEvents;