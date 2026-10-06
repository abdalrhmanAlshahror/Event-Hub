import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./Component/navbar";
import Loading from "./Component/loading";
import Footer from "./Component/Footer";
import CreateEvent from "./Component/createEvent";
import EventDetails from "./Component/EventDetails";
import './index.css';
import Login from './Component/Login';
import Register from './Component/Register';
import Home from './Component/Home'
import ExplorEvent from './Component/ExplorEvent';

function AppContent() {
    const location = useLocation();
    const hideNavbar = location.pathname === '/'; // ✅ اخفي بس بصفحة الهوم

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white">
            {!hideNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Loading />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/explore" element={ <ExplorEvent/> } />
            </Routes>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;