import { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faFilter, faCalendarMinus, faDollarSign, faMagnifyingGlass, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

function Search() {
    const [categories, setcategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenD, setIsOpenD] = useState(false);
    const [isOpenP, setIsOpenP] = useState(false);
    const [active, setActive] = useState('All Categories');
    const [activeD, setActiveD] = useState('Any Date');
    const [activeP, setActiveP] = useState('Any Price');
    const [query, setQuery] = useState('');

    const navigate = useNavigate();

    // السعر الأقصى لكل خيار (بيتبعت لصفحة البحث)
    const priceToMax = {
        'Free': 0,
        'Under 50$': 50,
        'Under 100$': 100,
    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/category')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setcategories(response.data);
                } else if (response.data && Array.isArray(response.data.categories)) {
                    setcategories(response.data.categories);
                } else if (response.data && typeof response.data === 'object') {
                    const possibleArray = Object.values(response.data).find(val => Array.isArray(val));
                    if (possibleArray) setcategories(possibleArray);
                }
            })
            .catch(error => {
                console.error("حدث خطأ أثناء جلب البيانات:", error);
            });
    }, []);

    const categoryFilter = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen)
    }

    const dateFilter = (e) => {
        e.preventDefault();
        setIsOpenD(!isOpenD)
    }

    const priceFilter = (e) => {
        e.preventDefault();
        setIsOpenP(!isOpenP)
    }

    const CheangeActive = (e, name) => {
        e.preventDefault();
        setActive(name);
        setIsOpen(false);
    }

    const CheangeActiveD = (e, name) => {
        e.preventDefault();
        setActiveD(name);
        setIsOpenD(false);
    }

    const CheangeActiveP = (e, name) => {
        e.preventDefault();
        setActiveP(name);
        setIsOpenP(false);
    }

    // لما تكبس Search أو Enter
    const handleSearch = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (query.trim()) params.set('q', query.trim());
        if (active !== 'All Categories') params.set('category', active);
        if (activeD !== 'Any Date') params.set('date', activeD);
        if (activeP !== 'Any Price') params.set('maxPrice', priceToMax[activeP]);

        navigate(`/explore?${params.toString()}`);
    }

    return(
        <div>
            <form onSubmit={handleSearch}>
                <div className='max-w-6xl mx-auto px-6'>
                    <div className='p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl'>
                        <div className='flex flex-col lg:flex-row gap-4'>
                            <div className='flex-1 relative'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500' />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className='w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-xl focus:outline-none focus:border-rose-500 text-sm transition-colors'
                                    type="text"
                                    placeholder="Search events, venues, or organizers..."
                                />
                            </div>
                            <div className='flex flex-wrap items-center lg:flex-nowrap gap-3'>
                                <div className="relative">
                                    <button onClick={categoryFilter} type="button" className='flex items-center justify-between gap-2 border px-4 py-3.5 text-sm w-full lg:w-48 bg-slate-950 border-slate-800 text-slate-200 rounded-xl hover:border-slate-700 transition-colors'>
                                    <FontAwesomeIcon icon={faFilter} className='text-rose-400 mr-1' />
                                    <span className="truncate">{ active }</span>
                                    <FontAwesomeIcon icon={faAngleDown} className='ml-1 text-slate-500' />
                                    </button>
                                        {isOpen && (
                                            <ul className='bg-slate-900 border border-slate-800 w-48 rounded-xl p-2 absolute top-full left-0 mt-2 z-50 shadow-xl space-y-1'>
                                                    <li
                                                        onClick={(e) => CheangeActive(e, 'All Categories')}
                                                        className={`${active === 'All Categories'
                                                            ? 'bg-rose-600 text-white'
                                                            : 'text-slate-300 hover:bg-slate-800'
                                                            } px-3 py-2 text-sm flex justify-between items-center rounded-lg duration-150 cursor-pointer`}
                                                            >
                                                            <span>All Categories</span>
                                                            {active === 'All Categories' && <FontAwesomeIcon icon={faCheck} className="text-xs" />}
                                                    </li>

                                                    {Array.isArray(categories) && categories.map((category, index) => (
                                                        <li
                                                            key={index}
                                                            onClick={(e) => CheangeActive(e, category.name)}
                                                            className={`${active === category.name
                                                                ? 'bg-rose-600 text-white'
                                                                : 'text-slate-300 hover:bg-slate-800'
                                                            } px-3 py-2 text-sm flex justify-between items-center rounded-lg duration-150 cursor-pointer`}
                                                        >
                                                            <span>{category.name}</span>
                                                            {active === category.name && <FontAwesomeIcon icon={faCheck} className="text-xs" />}
                                                        </li>
                                                    ))}
                                                </ul>
                                        )}
                                </div>
                                <div className="relative">
                                    <button onClick={dateFilter} type="button" className='flex items-center justify-between gap-2 border px-4 py-3.5 text-sm w-full lg:w-48 bg-slate-950 border-slate-800 text-slate-200 rounded-xl hover:border-slate-700 transition-colors'>
                                    <FontAwesomeIcon className='text-orange-400 mr-1' icon={faCalendarMinus} />
                                    <span className="truncate">{activeD}</span>
                                    <FontAwesomeIcon icon={faAngleDown} className='ml-1 text-slate-500' />
                                    </button>
                                    {isOpenD && (
                                        <ul className='bg-slate-900 border border-slate-800 w-48 rounded-xl p-2 absolute top-full left-0 mt-2 z-50 shadow-xl space-y-1'>
                                            {['Any Date', 'Today', 'This Week', 'This Month'].map((d) => (
                                                <li
                                                    key={d}
                                                    onClick={(e) => CheangeActiveD(e, d)}
                                                    className={`${activeD === d
                                                        ? 'bg-rose-600 text-white'
                                                        : 'text-slate-300 hover:bg-slate-800'
                                                    } px-3 py-2 text-sm flex justify-between items-center rounded-lg duration-150 cursor-pointer`}
                                                >
                                                    {d}
                                                    {activeD === d && <FontAwesomeIcon icon={faCheck} className="text-xs" />}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="relative">
                                    <button onClick={priceFilter} type="button" className='flex items-center justify-between gap-2 border px-4 py-3.5 text-sm w-full lg:w-48 bg-slate-950 border-slate-800 text-slate-200 rounded-xl hover:border-slate-700 transition-colors'>
                                    <FontAwesomeIcon icon={faDollarSign} className='text-emerald-400 mr-1' />
                                    <span className="truncate">{ activeP }</span>
                                    <FontAwesomeIcon icon={faAngleDown} className='ml-1 text-slate-500' />
                                    </button>
                                    {isOpenP && (
                                        <ul className='bg-slate-900 border border-slate-800 w-48 rounded-xl p-2 absolute top-full left-0 mt-2 z-50 shadow-xl space-y-1'>
                                            {['Any Price', 'Free', 'Under 50$', 'Under 100$'].map((p) => (
                                                <li
                                                    key={p}
                                                    onClick={(e) => CheangeActiveP(e, p)}
                                                    className={`${activeP === p
                                                        ? 'bg-rose-600 text-white'
                                                        : 'text-slate-300 hover:bg-slate-800'
                                                    } px-3 py-2 text-sm flex justify-between items-center rounded-lg duration-150 cursor-pointer`}
                                                >
                                                    {p}
                                                    {activeP === p && <FontAwesomeIcon icon={faCheck} className="text-xs" />}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <button type="submit" className='flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white shadow-lg shadow-rose-500/20 cursor-pointer transition-all'>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Search;