import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandSparkles, faLanguage, faTachographDigital } from '@fortawesome/free-solid-svg-icons'
import '../index.css'
import { Link } from 'react-router-dom'
import { useLanguage } from "../Context/LanguageContext";

function Navbar() {
    const { lang, toggleLang } = useLanguage();

    return (
        <nav className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80'>
            <div className='max-w-7xl mx-auto px-6 py-4'>
                <div className='flex items-center justify-between'>
                    <Link to='/home' className='flex items-center gap-3'>
                        <span className='w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20'>
                            <FontAwesomeIcon icon={faHandSparkles} size='lg'/>
                        </span>
                        <h1 className="text-2xl font-black bg-gradient-to-r from-orange-400 via-rose-500 to-pink-500 bg-clip-text text-transparent">EventHub</h1>
                    </Link>

                    <div className='flex items-center gap-3'>
                        <button onClick={toggleLang} className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition duration-200 text-sm font-medium">
                            <FontAwesomeIcon className='text-rose-400' icon={faLanguage} /> {lang === "ar" ? "EN" : "AR"}
                        </button>
                        <Link to="/explore">
                            <button className='flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 transition duration-200 border border-slate-700 text-sm font-medium'>
                                <FontAwesomeIcon icon={faHandSparkles} className="text-orange-400" /> Explore Events
                            </button>
                        </Link>
                        <Link to="/dashboard" className='inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition duration-200 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white shadow-lg shadow-rose-500/20'>
                            <FontAwesomeIcon icon={faTachographDigital} /> Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
