import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to inject bearer token before request hits the network
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('gm_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
        delete config.headers['content-type'];
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
