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
        // Use admin token for admin pages, otherwise use user token
        const isAdminPage = window.location.pathname.startsWith('/admin');
        const token = isAdminPage
            ? localStorage.getItem('adminToken')
            : localStorage.getItem('token');

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
    adminLogin: (email: string, password: string) =>
        api.post('/auth/admin/login', { email, password }),
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

// Destination APIs
export const destinationAPI = {
    getAll: () => api.get('/destinations'),
    getById: (id: number) => api.get(`/destinations/${id}`),
    getByCategory: (category: string) => api.get(`/destinations/category/${category}`),
    search: (city?: string, category?: string) => {
        const params = new URLSearchParams();
        if (city) params.append('city', city);
        if (category) params.append('category', category);
        return api.get(`/destinations/search?${params.toString()}`);
    },
    searchByKeyword: (keyword: string) => api.get(`/destinations/search/keyword?keyword=${keyword}`),
    create: (data: object) => api.post('/destinations', data),
    update: (id: number, data: object) => api.put(`/destinations/${id}`, data),
    delete: (id: number) => api.delete(`/destinations/${id}`),
};

// Activity APIs
export const activityAPI = {
    getAll: () => api.get('/activities'),
    getById: (id: number) => api.get(`/activities/${id}`),
    getByDestination: (destinationId: number) => api.get(`/activities/destination/${destinationId}`),
    create: (data: object) => api.post('/activities', data),
    update: (id: number, data: object) => api.put(`/activities/${id}`, data),
    delete: (id: number) => api.delete(`/activities/${id}`),
    book: (userId: number, data: object) => api.post(`/activities/book/${userId}`, data),
    getBookingsForUser: (userId: number) => api.get(`/activities/bookings/user/${userId}`),
    getBookingById: (bookingId: number) => api.get(`/activities/bookings/${bookingId}`),
    cancelBooking: (bookingId: number) => api.put(`/activities/bookings/${bookingId}/cancel`),
    confirmBooking: (bookingId: number) => api.put(`/activities/bookings/${bookingId}/confirm`),
};

// Hotel APIs
export const hotelAPI = {
    getAll: () => api.get('/hotels'),
    getById: (id: number) => api.get(`/hotels/${id}`),
    search: (city?: string, starRating?: number) => {
        const params = new URLSearchParams();
        if (city) params.append('city', city);
        if (starRating) params.append('starRating', starRating.toString());
        return api.get(`/hotels/search?${params.toString()}`);
    },
    searchByKeyword: (keyword: string) => api.get(`/hotels/search/keyword?keyword=${keyword}`),
    create: (data: object) => api.post('/hotels', data),
    update: (id: number, data: object) => api.put(`/hotels/${id}`, data),
    delete: (id: number) => api.delete(`/hotels/${id}`),
    // Room endpoints
    getRoomsByHotel: (hotelId: number) => api.get(`/hotels/${hotelId}/rooms`),
    getAvailableRooms: (hotelId: number) => api.get(`/hotels/${hotelId}/rooms/available`),
    createRoom: (data: object) => api.post('/hotels/rooms', data),
    // Booking endpoints
    book: (userId: number, data: object) => api.post(`/hotels/bookings/${userId}`, data),
    getBookingsForUser: (userId: number) => api.get(`/hotels/bookings/user/${userId}`),
    getBookingById: (bookingId: number) => api.get(`/hotels/bookings/${bookingId}`),
    cancelBooking: (bookingId: number) => api.put(`/hotels/bookings/${bookingId}/cancel`),
    confirmBooking: (bookingId: number) => api.put(`/hotels/bookings/${bookingId}/confirm`),
};

// Cab APIs
export const cabAPI = {
    getAll: () => api.get('/cabs'),
    getById: (id: number) => api.get(`/cabs/${id}`),
    getAvailable: () => api.get('/cabs/available'),
    getByType: (vehicleType: string) => api.get(`/cabs/type/${vehicleType}`),
    getAvailableByType: (vehicleType: string) => api.get(`/cabs/available/${vehicleType}`),
    create: (data: object) => api.post('/cabs', data),
    update: (id: number, data: object) => api.put(`/cabs/${id}`, data),
    delete: (id: number) => api.delete(`/cabs/${id}`),
    setAvailability: (id: number, available: boolean) => api.put(`/cabs/${id}/availability?available=${available}`),
    // Booking endpoints
    book: (userId: number, data: object) => api.post(`/cabs/bookings/${userId}`, data),
    getBookingsForUser: (userId: number) => api.get(`/cabs/bookings/user/${userId}`),
    getBookingById: (bookingId: number) => api.get(`/cabs/bookings/${bookingId}`),
    cancelBooking: (bookingId: number) => api.put(`/cabs/bookings/${bookingId}/cancel`),
    confirmBooking: (bookingId: number) => api.put(`/cabs/bookings/${bookingId}/confirm`),
    completeBooking: (bookingId: number, finalFare?: number) =>
        api.put(`/cabs/bookings/${bookingId}/complete${finalFare ? `?finalFare=${finalFare}` : ''}`),
};

// Payment APIs
export const paymentAPI = {
    checkPendingPayment: (userId: number) => api.get(`/payments/pending/${userId}`),
    createOrder: (userId: number, data: { hotelBookingIds?: number[], cabBookingIds?: number[], activityBookingIds?: number[] }) =>
        api.post(`/payments/create-order/${userId}`, data),
    verifyPayment: (data: { razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string }) =>
        api.post('/payments/verify', data),
    cancelPayment: (paymentId: number, userId: number) =>
        api.put(`/payments/${paymentId}/cancel/${userId}`),
    getPaymentsForUser: (userId: number) => api.get(`/payments/user/${userId}`),
};

export default api;
