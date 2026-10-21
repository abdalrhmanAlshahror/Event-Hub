import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandSparkles, faCamera } from '@fortawesome/free-solid-svg-icons'

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

function Register() {
    const [form, setForm] = useState({
        name: '', email: '', password: '', password_confirmation: '', role: 'attendee'
    });
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const fileInput = useRef(null);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;

        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            setError('Photo must be a JPG, PNG or GIF');
            return;
        }
        if (file.size > MAX_SIZE) {
            setError('Photo must be smaller than 2MB');
            return;
        }

        setError('');
        setPhoto(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // الصورة ملف، فلازم نبعت FormData
        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => data.append(key, value));
        if (photo) data.append('profile_photo', photo);

        try {
            await register(data);
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

                    {/* الصورة الشخصية */}
                    <div className='flex items-center gap-4'>
                        <input
                            ref={fileInput}
                            type="file"
                            accept="image/png,image/jpeg,image/gif"
                            onChange={handlePhotoChange}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInput.current?.click()}
                            className='w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-dashed border-orange-500/50 hover:border-orange-400 bg-white/5 flex items-center justify-center text-orange-400 transition-colors cursor-pointer'
                        >
                            {preview ? (
                                <img src={preview} alt="Profile preview" className='w-full h-full object-cover' />
                            ) : (
                                <FontAwesomeIcon icon={faCamera} size='lg' />
                            )}
                        </button>
                        <div className='text-left'>
                            <p className='text-white'>Profile photo <span className='text-gray-500 text-sm'>(optional)</span></p>
                            <p className='text-gray-500 text-sm'>JPG, PNG or GIF (Max 2MB)</p>
                        </div>
                    </div>

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