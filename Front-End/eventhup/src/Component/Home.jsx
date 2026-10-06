import { faCalendarCheck, faUsers, faTicket, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background glow effects */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-40 right-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-6 pt-32 pb-24 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-300 text-sm mb-8">
                            <FontAwesomeIcon icon={faCalendarCheck} className="w-3 h-3" />
                            Discover & Manage Events with Ease
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Welcome to <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">EventHub</span>
                        </h1>

                        <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl mx-auto">
                            Your all-in-one platform to discover, create, and manage events effortlessly.
                            Whether you're an organizer or an attendee, EventHub connects you to experiences that matter.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/register"
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all font-medium flex items-center justify-center gap-2"
                            >
                                Create an Account
                                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/login"
                                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-purple-500/10 text-gray-200 rounded-xl hover:bg-white/10 transition-colors font-medium"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-8 hover:border-orange-500/30 transition-colors">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-6">
                            <FontAwesomeIcon icon={faCalendarCheck} className="text-orange-400 w-5 h-5" />
                        </div>
                        <h3 className="text-xl text-white mb-3">Discover Events</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Browse a wide range of events tailored to your interests, from workshops to hackathons and beyond.
                        </p>
                    </div>

                    <div className="bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-8 hover:border-rose-500/30 transition-colors">
                        <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center mb-6">
                            <FontAwesomeIcon icon={faTicket} className="text-rose-400 w-5 h-5" />
                        </div>
                        <h3 className="text-xl text-white mb-3">Book Instantly</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Reserve your spot in just a few clicks and manage all your bookings in one place.
                        </p>
                    </div>

                    <div className="bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-8 hover:border-purple-500/30 transition-colors">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                            <FontAwesomeIcon icon={faUsers} className="text-purple-400 w-5 h-5" />
                        </div>
                        <h3 className="text-xl text-white mb-3">Organize with Confidence</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Create and manage your own events, track attendees, and grow your community effortlessly.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="bg-gradient-to-r from-orange-500/10 to-rose-500/10 border border-orange-500/20 rounded-2xl p-12 text-center">
                    <h2 className="text-3xl text-white mb-4">Ready to get started?</h2>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        Join EventHub today and start exploring events, or create your own in minutes.
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all font-medium"
                    >
                        Get Started
                        <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;