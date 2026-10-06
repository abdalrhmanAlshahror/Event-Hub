import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandSparkles, faUserGroup, faPlus, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function StartEvent() {
    return (
        <div>
            <div className="px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-10 md:p-14">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 mb-4">
                                    <FontAwesomeIcon icon={faHandSparkles} className='text-rose-400' />
                                    <span className='text-sm font-semibold text-rose-300'>Join thousands of organizers worldwide</span>
                                </div>
                                <h2 className='text-4xl md:text-5xl font-black mb-4 text-slate-100'>Create Your Event</h2>
                                <p className='text-lg text-slate-400 mb-8 max-w-xl leading-relaxed'>Turn your vision into reality. Our platform makes event creation simple, powerful, and effective.</p>
                                
                                <div className='flex flex-wrap gap-3 mb-8 justify-center md:justify-start'>
                                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300">
                                        <FontAwesomeIcon icon={faUserGroup} className='text-rose-400' />
                                        <span>Reach millions</span>
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300">
                                        <FontAwesomeIcon icon={faArrowTrendUp} className='text-orange-400' />
                                        <span>Grow audience</span>
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300">
                                        <FontAwesomeIcon icon={faHandSparkles} className='text-emerald-400' />
                                        <span>Pro tools included</span>
                                    </div>
                                </div>
                                <Link className='inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 px-7 py-3.5 shadow-lg shadow-rose-500/20 text-white font-bold text-base transition-all' to="/create-event">
                                    <FontAwesomeIcon icon={faPlus} /> Add Event
                                </Link>
                            </div>
                            
                            <div className='hidden lg:block'>
                                <div className='relative w-64 h-64'>
                                    <div className='absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 to-rose-600 opacity-20 blur-2xl animate-pulse'></div>
                                    <div className='absolute inset-8 rounded-full bg-gradient-to-br from-orange-600 to-rose-600 flex items-center justify-center'>
                                        {/* استخدام text-7xl أو text-8xl لتكبير الأيقونة بشكل ممتاز */}
                                        <FontAwesomeIcon icon={faPlus} className='text-7xl text-white' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartEvent;