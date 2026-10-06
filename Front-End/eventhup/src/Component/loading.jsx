import { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHandSparkles, faCalendarMinus, faLocationDot, faUserGroup} from '@fortawesome/free-solid-svg-icons'
import Search from "./search"
import StartEvent from "./startEvent"
import Event from "./Event"
import { Link } from "react-router-dom"

function Loading() {
    const [event, setEvent] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/counts')
        .then(response => {
            setEvent(response.data);
        })
        .catch(error => {
            console.error("حدث خطأ أثناء جلب البيانات:", error);
        });
    }, []);

    return(    
        <div>
            <section className='relative pt-36 pb-20 px-6 overflow-hidden'>
                <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                    <div className='absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl'></div>
                    <div className='absolute top-40 right-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl'></div>
                </div>
                <div className='max-w-7xl mx-auto relative z-10'>
                    <div className='text-center max-w-4xl mx-auto'>
                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 mb-6'>
                            <FontAwesomeIcon icon={faHandSparkles} className='text-rose-400' />
                            <span className='text-sm font-semibold text-rose-300'>Welcome to EventHub</span>
                        </div>

                        <h1 className='text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight'>
                            <span className='text-slate-100'>Discover Professional Events</span>
                            <br/>
                            <span className='bg-gradient-to-r from-orange-400 via-rose-500 to-pink-500 bg-clip-text text-transparent'>That Transform Your Experience</span>
                        </h1>

                        <p className='text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed'>Connect with thousands of events worldwide. From conferences to concerts, find your next unforgettable experience.</p>

                        <Link to='/explore' className='inline-flex px-8 py-4 items-center justify-center gap-3 rounded-xl font-bold bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 hover:opacity-95 text-white shadow-xl shadow-rose-500/25 transition-all text-lg cursor-pointer'>
                            <FontAwesomeIcon icon={faHandSparkles} />
                            <span>Start Exploring</span>
                        </Link>

                        <div className='mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto'>
                            <div className='flex items-center justify-center flex-col p-6 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-lg'>
                                <FontAwesomeIcon icon={faCalendarMinus} className='text-rose-400 text-2xl mb-2' />
                                <span className='text-3xl font-extrabold text-slate-100 mb-1'>{event.Event_count || 0}</span>
                                <p className='text-sm font-medium text-slate-400'>Active Events</p>
                            </div>
                            <div className='flex items-center justify-center flex-col p-6 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-lg'>
                                <FontAwesomeIcon icon={faLocationDot} className='text-orange-400 text-2xl mb-2' />
                                <span className='text-3xl font-extrabold text-slate-100 mb-1'>{event.Cities_count || 0}</span>
                                <p className='text-sm font-medium text-slate-400'>Cities</p>
                            </div>
                            <div className='flex items-center justify-center flex-col p-6 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-lg'>
                                <FontAwesomeIcon icon={faUserGroup} className='text-emerald-400 text-2xl mb-2' />
                                <span className='text-3xl font-extrabold text-slate-100 mb-1'>{event.User_count || 0}</span>
                                <p className='text-sm font-medium text-slate-400'>Attendees</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Search />
            <Event />
            <StartEvent />
        </div>
    );
}

export default Loading;