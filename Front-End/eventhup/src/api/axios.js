import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    withXSRFToken: true,
});

// قبل أي طلب POST/PUT/PATCH/DELETE، اجلب CSRF cookie تلقائياً
api.interceptors.request.use(async (config) => {
    const stateChangingMethods = ['post', 'put', 'patch', 'delete'];
    if (stateChangingMethods.includes(config.method)) {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
            withCredentials: true,
        });
    }
    return config;
});

export default api;