import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandSparkles } from '@fortawesome/free-solid-svg-icons'

function Register() {
    const [form, setForm] = useState({
        name: '', email: '', password: '', password_confirmation: '', role: 'attendee'
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(form);
            navigate('/home');
        } catch (err) {
            setError('There is an error; please check the data');
        }
    };

    return (
        <div className='pt-30'>
            <div className="max-w-md mx-auto pt-10 px-8 bg-[#0f0f1e]/50 rounded-2xl">
                <div className='flex pb-3 items-center justify-center'>
                    <span className='w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20'>
                        <FontAwesomeIcon icon={faHandSparkles} size='lg'/>
                    </span>
                    <h1 className="text-2xl font-black pl-3 bg-gradient-to-r from-orange-400 via-rose-500 to-pink-500 bg-clip-text text-transparent">EventHub</h1>
                </div>
                <h2 className="text-2xl font-black bg-gradient-to-r pb-5 from-orange-400 via-rose-500 to-pink-500 bg-clip-text text-transparent">Create an account</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" placeholder="name" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/5 text-white" required />
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/5 text-white" required />
                    <select name="role" onChange={handleChange} className="w-full p-3 rounded-xl bg-[#0f0f1e]/50 text-white">
                        <option value="admin">admin</option>
                        <option value="organizer">organizer</option>
                        <option value="attendee">attendee</option>
                    </select>
                    <input name="password" type="password" placeholder="password" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/5 text-white" required />
                    <input name="password_confirmation" type="password" placeholder="Confirm password" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/5 text-white" required />
                    <button type="submit" className="w-full py-3 bg-orange-500 text-white rounded-xl">
                       Create an account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;