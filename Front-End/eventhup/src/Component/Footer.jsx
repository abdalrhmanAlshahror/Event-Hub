import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandSparkles, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'

function Footer() {
    return (
        <footer className='relative mt-20 border-t border-slate-800/80 bg-slate-950/90'>
            <div className='max-w-7xl mx-auto px-6 py-16'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
                    <div>
                        <div className='flex items-center gap-3'>
                            <span className='w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white p-1 shadow-md'>
                                <FontAwesomeIcon icon={faHandSparkles} size='lg'/>
                            </span>
                            <h1 className="text-2xl font-black bg-gradient-to-r from-orange-400 via-rose-500 to-pink-500 bg-clip-text text-transparent">EventHub</h1>
                        </div>
                        <p className='text-slate-400 text-sm mt-4 leading-relaxed'>Connecting people with unforgettable experiences. Your trusted platform for discovering and creating events.</p>
                    </div> 
                    <div>
                        <h2 className="text-slate-100 font-bold mb-4">Quick Links</h2>
                        <ul className='space-y-2.5 text-sm'>
                            <li><a href="#" className='text-slate-400 hover:text-rose-400 transition-colors'>About Us</a></li>
                            <li><a href="#" className='text-slate-400 hover:text-rose-400 transition-colors'>Events</a></li>
                            <li><a href="#" className='text-slate-400 hover:text-rose-400 transition-colors'>Create Event</a></li>
                            <li><a href="#" className='text-slate-400 hover:text-rose-400 transition-colors'>Pricing</a></li>
                            <li><a href="#" className='text-slate-400 hover:text-rose-400 transition-colors'>Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-slate-100 font-bold mb-4">Contact Us</h2>
                        <ul className='space-y-3 text-sm'>
                            <li className='flex items-start gap-3 text-slate-400'>
                                <FontAwesomeIcon className='w-4 h-4 text-rose-400 flex-shrink-0 mt-1' icon={faEnvelope} />
                                <span>abdalrhmanalshror2003@gmail.com</span>
                            </li>
                            <li className='flex items-start gap-3 text-slate-400'>
                                <FontAwesomeIcon className='w-4 h-4 text-orange-400 flex-shrink-0 mt-1' icon={faPhone} />
                                <span>+963 998 940 359</span>
                            </li>
                            <li className='flex items-start gap-3 text-slate-400'>
                                <FontAwesomeIcon className='w-4 h-4 text-emerald-400 flex-shrink-0 mt-1' icon={faLocationDot} />
                                <span>123 Event Street, City, Country</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-slate-100 font-bold mb-4">Follow Us</h2>
                        <ul className='flex items-center gap-3'>
                            <li><a href="#" className='w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-rose-600 hover:border-rose-600 transition-all'><FontAwesomeIcon icon={faFacebookF} /></a></li>
                            <li><a href="#" className='w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-rose-600 hover:border-rose-600 transition-all'><FontAwesomeIcon icon={faTwitter} /></a></li>
                            <li><a href="#" className='w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-rose-600 hover:border-rose-600 transition-all'><FontAwesomeIcon icon={faInstagram} /></a></li>
                            <li><a href="#" className='w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-rose-600 hover:border-rose-600 transition-all'><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
                        </ul>
                    </div>
                </div>
                <div className='border-t border-slate-800/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-4'>
                    <p className='text-slate-500 text-sm'>&copy; 2026 EventHub. All rights reserved.</p>
                    <ul className='flex gap-6 items-center justify-center text-sm'>
                        <li><a href="#" className='text-slate-500 hover:text-rose-400 transition-colors'>Privacy Policy</a></li>
                        <li><a href="#" className='text-slate-500 hover:text-rose-400 transition-colors'>Terms of Service</a></li>
                        <li><a href="#" className='text-slate-500 hover:text-rose-400 transition-colors'>Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;