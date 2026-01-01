import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ActivityCard from '../components/ActivityCard';
import { destinationAPI, activityAPI } from '../services/api';

interface Activity {
    id: number;
    name: string;
    description?: string;
    duration?: string;
    price: number;
    maxParticipants?: number;
    availableSlots?: number;
    imageUrl?: string;
    destinationName?: string;
}

interface Destination {
    id: number;
    name: string;
    city: string;
    state?: string;
    country?: string;
    description?: string;
    category?: string;
    rating?: number;
    imageUrl?: string;
    latitude?: number;
    longitude?: number;
    bestTimeToVisit?: string;
    entryFee?: number;
    activities?: Activity[];
}

const categoryEmojis: Record<string, string> = {
    BEACH: '🏖️',
    MOUNTAIN: '⛰️',
    HERITAGE: '🏛️',
    ADVENTURE: '🎯',
    RELIGIOUS: '🛕',
    NATURE: '🌿',
    CITY: '🏙️',
    WILDLIFE: '🦁',
};

const DestinationDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [destination, setDestination] = useState<Destination | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [bookingModal, setBookingModal] = useState<{ show: boolean; activityId: number | null }>({
        show: false,
        activityId: null,
    });
    const [bookingForm, setBookingForm] = useState({
        bookingDate: '',
        numberOfParticipants: 1,
    });
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        if (id) {
            fetchDestination(parseInt(id));
        }
    }, [id]);

    const fetchDestination = async (destinationId: number) => {
        try {
            setLoading(true);
            const response = await destinationAPI.getById(destinationId);
            setDestination(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load destination details.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBookActivity = (activityId: number) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        setBookingModal({ show: true, activityId });
        setBookingForm({ bookingDate: '', numberOfParticipants: 1 });
        setBookingSuccess(false);
    };

    const submitBooking = async () => {
        if (!bookingModal.activityId || !bookingForm.bookingDate) {
            return;
        }

        try {
            setBookingLoading(true);
            // Get user ID from token (simplified - in real app, decode JWT or get from context)
            const userId = 1; // You should get this from auth context
            await activityAPI.book(userId, {
                activityId: bookingModal.activityId,
                bookingDate: bookingForm.bookingDate,
                numberOfParticipants: bookingForm.numberOfParticipants,
            });
            setBookingSuccess(true);
            // Refresh destination to update available slots
            if (id) {
                fetchDestination(parseInt(id));
            }
        } catch (err) {
            setError('Booking failed. Please try again.');
            console.error(err);
        } finally {
            setBookingLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error || !destination) {
        return (
            <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
                <div className="glass-card p-8 text-center max-w-md">
                    <span className="text-6xl mb-4 block">😕</span>
                    <h2 className="text-2xl font-display font-bold text-white mb-2">Destination Not Found</h2>
                    <p className="text-gray-400 mb-6">{error || 'The destination you are looking for does not exist.'}</p>
                    <Link to="/destinations" className="btn-primary">
                        Back to Destinations
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-hero-gradient">
            {/* Header */}
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
                            <Link to="/destinations" className="text-white font-medium">Destinations</Link>
                            <Link to="/my-bookings" className="text-gray-300 hover:text-white transition-colors">My Bookings</Link>
                        </nav>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative h-[400px] overflow-hidden">
                {destination.imageUrl ? (
                    <img
                        src={destination.imageUrl}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
                        <span className="text-9xl">{categoryEmojis[destination.category || 'NATURE']}</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/50 to-transparent" />

                {/* Breadcrumb */}
                <div className="absolute top-6 left-6">
                    <Link
                        to="/destinations"
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors glass-card px-4 py-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Destinations
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title Card */}
                        <div className="glass-card p-8">
                            <div className="flex flex-wrap items-start gap-4 mb-6">
                                {destination.category && (
                                    <span className="px-4 py-1.5 rounded-full bg-primary-500/20 text-primary-400 text-sm font-medium">
                                        {categoryEmojis[destination.category]} {destination.category}
                                    </span>
                                )}
                                {destination.rating !== undefined && destination.rating > 0 && (
                                    <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium">
                                        <span>★</span> {destination.rating.toFixed(1)}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl font-display font-bold text-white mb-3">
                                {destination.name}
                            </h1>

                            <div className="flex items-center gap-2 text-gray-400 text-lg mb-6">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>
                                    {destination.city}
                                    {destination.state ? `, ${destination.state}` : ''}
                                    {destination.country ? `, ${destination.country}` : ''}
                                </span>
                            </div>

                            {destination.description && (
                                <p className="text-gray-300 leading-relaxed">
                                    {destination.description}
                                </p>
                            )}
                        </div>

                        {/* Activities Section */}
                        {destination.activities && destination.activities.length > 0 && (
                            <div className="glass-card p-8">
                                <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="text-2xl">🎯</span>
                                    Things to Do
                                </h2>
                                <div className="space-y-4">
                                    {destination.activities.map((activity) => (
                                        <ActivityCard
                                            key={activity.id}
                                            id={activity.id}
                                            name={activity.name}
                                            description={activity.description}
                                            duration={activity.duration}
                                            price={activity.price}
                                            maxParticipants={activity.maxParticipants}
                                            availableSlots={activity.availableSlots}
                                            imageUrl={activity.imageUrl}
                                            onBook={handleBookActivity}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Info Cards */}
                    <div className="space-y-6">
                        {/* Quick Info Card */}
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-display font-bold text-white mb-4">Quick Info</h3>
                            <div className="space-y-4">
                                {destination.entryFee !== undefined && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Entry Fee</span>
                                        <span className="text-white font-semibold">
                                            {destination.entryFee > 0 ? `₹${destination.entryFee.toLocaleString()}` : 'Free'}
                                        </span>
                                    </div>
                                )}
                                {destination.bestTimeToVisit && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Best Time to Visit</span>
                                        <span className="text-white font-semibold">{destination.bestTimeToVisit}</span>
                                    </div>
                                )}
                                {destination.activities && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Activities Available</span>
                                        <span className="text-white font-semibold">{destination.activities.length}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Location Card */}
                        {destination.latitude && destination.longitude && (
                            <div className="glass-card p-6">
                                <h3 className="text-lg font-display font-bold text-white mb-4">Location</h3>
                                <div className="aspect-video rounded-lg bg-dark-200 flex items-center justify-center">
                                    <span className="text-gray-500 text-sm">Map integration coming soon</span>
                                </div>
                                <div className="mt-4 text-sm text-gray-400">
                                    <p>Lat: {destination.latitude}</p>
                                    <p>Long: {destination.longitude}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Booking Modal */}
            {bookingModal.show && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="glass-card p-8 max-w-md w-full">
                        {bookingSuccess ? (
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-white mb-2">Booking Confirmed!</h3>
                                <p className="text-gray-400 mb-6">Your activity has been booked successfully.</p>
                                <button
                                    onClick={() => setBookingModal({ show: false, activityId: null })}
                                    className="btn-primary w-full"
                                >
                                    Done
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-display font-bold text-white mb-6">Book Activity</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Booking Date
                                        </label>
                                        <input
                                            type="date"
                                            value={bookingForm.bookingDate}
                                            onChange={(e) => setBookingForm({ ...bookingForm, bookingDate: e.target.value })}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors [color-scheme:dark]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Number of Participants
                                        </label>
                                        <input
                                            type="number"
                                            value={bookingForm.numberOfParticipants}
                                            onChange={(e) => setBookingForm({ ...bookingForm, numberOfParticipants: parseInt(e.target.value) || 1 })}
                                            min={1}
                                            max={10}
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={() => setBookingModal({ show: false, activityId: null })}
                                        className="flex-1 px-6 py-3 border border-white/20 rounded-xl text-white hover:bg-white/5 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={submitBooking}
                                        disabled={bookingLoading || !bookingForm.bookingDate}
                                        className="flex-1 btn-primary disabled:opacity-50"
                                    >
                                        {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DestinationDetail;
