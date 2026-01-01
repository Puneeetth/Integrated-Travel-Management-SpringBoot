import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { activityAPI, hotelAPI, cabAPI } from '../services/api';

interface ActivityBooking {
    id: number;
    activityId?: number;
    activityName?: string;
    destinationId?: number;
    destinationName?: string;
    bookingDate: string;
    numberOfParticipants: number;
    totalPrice: number;
    status: string;
}

interface HotelBooking {
    id: number;
    hotelId?: number;
    hotelName?: string;
    hotelCity?: string;
    hotelImageUrl?: string;
    roomType?: string;
    checkInDate: string;
    checkOutDate: string;
    numberOfGuests: number;
    numberOfRooms: number;
    totalPrice: number;
    status: string;
    numberOfNights?: number;
}

interface CabBooking {
    id: number;
    cabId?: number;
    vehicleName?: string;
    vehicleNumber?: string;
    vehicleType?: string;
    driverName?: string;
    driverPhone?: string;
    cabImageUrl?: string;
    pickupLocation: string;
    dropLocation: string;
    pickupDateTime: string;
    distanceKm?: number;
    estimatedFare?: number;
    finalFare?: number;
    status: string;
}

const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-500/20 text-yellow-400',
    CONFIRMED: 'bg-green-500/20 text-green-400',
    CANCELLED: 'bg-red-500/20 text-red-400',
    COMPLETED: 'bg-blue-500/20 text-blue-400',
    CHECKED_IN: 'bg-green-500/20 text-green-400',
    CHECKED_OUT: 'bg-blue-500/20 text-blue-400',
    DRIVER_ASSIGNED: 'bg-purple-500/20 text-purple-400',
    IN_PROGRESS: 'bg-blue-500/20 text-blue-400',
    NO_SHOW: 'bg-red-500/20 text-red-400',
};

const MyBookings = () => {
    const navigate = useNavigate();
    const [activityBookings, setActivityBookings] = useState<ActivityBooking[]>([]);
    const [hotelBookings, setHotelBookings] = useState<HotelBooking[]>([]);
    const [cabBookings, setCabBookings] = useState<CabBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'activities' | 'hotels' | 'cabs'>('activities');

    useEffect(() => {
        fetchAllBookings();
    }, []);

    const fetchAllBookings = async () => {
        try {
            setLoading(true);
            const userId = 1;
            const [activityRes, hotelRes, cabRes] = await Promise.all([
                activityAPI.getBookingsForUser(userId),
                hotelAPI.getBookingsForUser(userId),
                cabAPI.getBookingsForUser(userId)
            ]);
            setActivityBookings(activityRes.data);
            setHotelBookings(hotelRes.data);
            setCabBookings(cabRes.data);
            setError('');
        } catch (err) {
            setError('Failed to load bookings.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelActivityBooking = async (bookingId: number) => {
        try {
            await activityAPI.cancelBooking(bookingId);
            fetchAllBookings();
        } catch (err) {
            setError('Failed to cancel booking.');
        }
    };

    const handleCancelHotelBooking = async (bookingId: number) => {
        try {
            await hotelAPI.cancelBooking(bookingId);
            fetchAllBookings();
        } catch (err) {
            setError('Failed to cancel booking.');
        }
    };

    const handleCancelCabBooking = async (bookingId: number) => {
        try {
            await cabAPI.cancelBooking(bookingId);
            fetchAllBookings();
        } catch (err) {
            setError('Failed to cancel booking.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const tabs = [
        { id: 'activities', label: 'Activities', icon: '🎯', count: activityBookings.length },
        { id: 'hotels', label: 'Hotels', icon: '🏨', count: hotelBookings.length },
        { id: 'cabs', label: 'Cabs', icon: '🚕', count: cabBookings.length },
    ];

    return (
        <div className="min-h-screen bg-hero-gradient">
            <header className="glass-navbar sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/dashboard" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-xl font-display font-bold text-white">
                                Travel<span className="gradient-text">Ease</span>
                            </span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6">
                            <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                            <Link to="/destinations" className="text-gray-300 hover:text-white transition-colors">Destinations</Link>
                            <Link to="/hotels" className="text-gray-300 hover:text-white transition-colors">Hotels</Link>
                            <Link to="/cabs" className="text-gray-300 hover:text-white transition-colors">Cabs</Link>
                            <Link to="/my-bookings" className="text-white font-medium">My Bookings</Link>
                        </nav>
                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-display font-bold text-white mb-2">My Bookings</h1>
                    <p className="text-gray-400">View and manage all your bookings in one place</p>
                </div>

                <div className="glass-card p-2 mb-8">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20' : 'bg-dark-200'}`}>{tab.count}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="glass-card p-4 mb-8 border border-red-500/20 bg-red-500/10">
                        <p className="text-red-400 text-center">{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                    </div>
                ) : activeTab === 'activities' ? (
                    activityBookings.length === 0 ? (
                        <div className="glass-card p-12 text-center">
                            <span className="text-6xl mb-4 block">🎯</span>
                            <h3 className="text-xl font-display font-bold text-white mb-2">No Activity Bookings</h3>
                            <p className="text-gray-400 mb-6">You haven't booked any activities yet.</p>
                            <Link to="/destinations" className="btn-primary">Explore Destinations</Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {activityBookings.map((booking) => (
                                <div key={booking.id} className="glass-card p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                                                <span className="text-2xl">🎯</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-display font-bold text-white mb-1">{booking.activityName || 'Activity'}</h3>
                                                {booking.destinationName && <p className="text-gray-400 text-sm">📍 {booking.destinationName}</p>}
                                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                                                    <span>📅 {new Date(booking.bookingDate).toLocaleDateString()}</span>
                                                    <span>👥 {booking.numberOfParticipants} person(s)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:items-end gap-3">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>{booking.status}</span>
                                                <span className="text-xl font-bold text-white">₹{booking.totalPrice.toLocaleString()}</span>
                                            </div>
                                            {booking.status === 'PENDING' && (
                                                <button onClick={() => handleCancelActivityBooking(booking.id)} className="text-red-400 hover:text-red-300 text-sm font-medium">Cancel Booking</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : activeTab === 'hotels' ? (
                    hotelBookings.length === 0 ? (
                        <div className="glass-card p-12 text-center">
                            <span className="text-6xl mb-4 block">🏨</span>
                            <h3 className="text-xl font-display font-bold text-white mb-2">No Hotel Bookings</h3>
                            <p className="text-gray-400 mb-6">You haven't booked any hotels yet.</p>
                            <Link to="/hotels" className="btn-primary">Find Hotels</Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {hotelBookings.map((booking) => (
                                <div key={booking.id} className="glass-card p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-blue-500/20 flex items-center justify-center">
                                                {booking.hotelImageUrl ? <img src={booking.hotelImageUrl} alt="" className="w-full h-full object-cover" /> : <span className="text-2xl">🏨</span>}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-display font-bold text-white mb-1">{booking.hotelName || 'Hotel'}</h3>
                                                {booking.hotelCity && <p className="text-gray-400 text-sm">📍 {booking.hotelCity}</p>}
                                                {booking.roomType && <p className="text-gray-500 text-sm">🛏️ {booking.roomType}</p>}
                                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                                                    <span>📅 {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}</span>
                                                    <span>🌙 {booking.numberOfNights || 1} night(s)</span>
                                                    <span>👥 {booking.numberOfGuests} guest(s)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:items-end gap-3">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>{booking.status}</span>
                                                <span className="text-xl font-bold text-white">₹{booking.totalPrice.toLocaleString()}</span>
                                            </div>
                                            {booking.status === 'PENDING' && (
                                                <button onClick={() => handleCancelHotelBooking(booking.id)} className="text-red-400 hover:text-red-300 text-sm font-medium">Cancel Booking</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    cabBookings.length === 0 ? (
                        <div className="glass-card p-12 text-center">
                            <span className="text-6xl mb-4 block">🚕</span>
                            <h3 className="text-xl font-display font-bold text-white mb-2">No Cab Bookings</h3>
                            <p className="text-gray-400 mb-6">You haven't booked any cabs yet.</p>
                            <Link to="/cabs" className="btn-primary">Book a Cab</Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cabBookings.map((booking) => (
                                <div key={booking.id} className="glass-card p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-green-500/20 flex items-center justify-center">
                                                {booking.cabImageUrl ? <img src={booking.cabImageUrl} alt="" className="w-full h-full object-cover" /> : <span className="text-2xl">🚕</span>}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-display font-bold text-white mb-1">{booking.vehicleName || 'Cab'}</h3>
                                                {booking.vehicleType && <p className="text-gray-500 text-sm">{booking.vehicleType} {booking.vehicleNumber && `• ${booking.vehicleNumber}`}</p>}
                                                {booking.driverName && <p className="text-gray-400 text-sm">🧑‍✈️ {booking.driverName} {booking.driverPhone && `• ${booking.driverPhone}`}</p>}
                                                <div className="flex flex-col gap-1 mt-2 text-sm text-gray-400">
                                                    <span>📍 {booking.pickupLocation} → {booking.dropLocation}</span>
                                                    <span>📅 {new Date(booking.pickupDateTime).toLocaleString()}</span>
                                                    {booking.distanceKm && <span>📏 {booking.distanceKm} km</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:items-end gap-3">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>{booking.status}</span>
                                                <span className="text-xl font-bold text-white">₹{(booking.finalFare || booking.estimatedFare || 0).toLocaleString()}</span>
                                            </div>
                                            {booking.status === 'PENDING' && (
                                                <button onClick={() => handleCancelCabBooking(booking.id)} className="text-red-400 hover:text-red-300 text-sm font-medium">Cancel Booking</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </main>
        </div>
    );
};

export default MyBookings;
