import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCalendarMinus } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import '../index.css';

function Card({ data }) {
    if (!data) return null;

    const imgSrc = data.image_path?.startsWith('http') 
        ? data.image_path 
        : `http://localhost:8000/${data.image_path}`;

    return (
        <Link to={`/event/${data.id}`}>     
            <div className="flex flex-col gap-6 group overflow-hidden rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1.5 w-full mx-auto">
                <div className="relative h-56 w-full overflow-hidden">
                    <img 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        src={imgSrc}
                        alt={data.title}        
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-lg bg-rose-600 text-xs font-semibold text-white shadow-md">
                            {data.categories?.name ? data.categories.name : 'General'}
                        </span>
                    </div>
                    
                    <div className='absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800'>
                        <span className="text-sm font-bold text-amber-400 flex items-center gap-1">
                            <FontAwesomeIcon className='w-3.5 h-3.5 text-amber-400' icon={faStar} />
                            {data.evaluation}
                        </span>
                    </div>
                </div>

                <div className='p-6 pt-0'>
                    <h3 className='text-xl font-bold text-slate-100 mb-3 line-clamp-2 group-hover:text-rose-400 transition-colors'>
                        {data.title} 
                    </h3>
                    
                    <div className='space-y-3'>
                        <div className='flex items-center gap-2.5 text-slate-400'>
                            <FontAwesomeIcon icon={faCalendarMinus} className='text-rose-400 w-4 h-4' />
                            <p className="text-sm">{data.date}</p> 
                        </div>
                        
                        <div className='flex items-center gap-2.5 text-slate-400'>
                            <FontAwesomeIcon icon={faLocationDot} className='text-orange-400 w-4 h-4' />
                            <p className="text-sm line-clamp-1">{data.location}</p> 
                        </div>
                        
                        <div className='flex items-center gap-1.5 pt-3 border-t border-slate-800/80'>
                            <FontAwesomeIcon className='w-4 h-4 text-amber-400' icon={faStar} />
                            <p className="text-sm font-medium text-slate-400">({data.evaluation}.0 / 5.0)</p>
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    );
}

export default Card;