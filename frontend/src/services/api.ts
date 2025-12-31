import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    login: (email: string, password: string) =>
        api.post('/auth/login', { email, password }),
    register: (name: string, email: string, password: string) =>
        api.post('/auth/register', { name, email, password }),
};

// Package APIs
export const packageAPI = {
    getAll: () => api.get('/packages'),
    getById: (id: number) => api.get(`/packages/${id}`),
    create: (data: object) => api.post('/packages', data),
    update: (id: number, data: object) => api.put(`/packages/${id}`, data),
    delete: (id: number) => api.delete(`/packages/${id}`),
};

// Booking APIs
export const bookingAPI = {
    create: (data: object) => api.post('/bookings', data),
    getUserBookings: () => api.get('/bookings/user'),
};

// Review APIs
export const reviewAPI = {
    getByPackage: (packageId: number) => api.get(`/reviews/package/${packageId}`),
    create: (data: object) => api.post('/reviews', data),
};

// Guide APIs
export const guideAPI = {
    getAll: () => api.get('/guides'),
    getById: (id: number) => api.get(`/guides/${id}`),
};

export default api;
