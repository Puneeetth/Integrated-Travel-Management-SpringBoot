import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import { hotelAPI } from '../services/api';

interface Room {
    id: number;
    roomType: string;
    pricePerNight: number;
    maxOccupancy?: number;
    totalRooms?: number;
    availableRooms?: number;
    amenities?: string;
    imageUrl?: string;
}

interface Hotel {
    id: number;
    name: string;
    city: string;
    address?: string;
    description?: string;
    starRating?: number;
    userRating?: number;
    imageUrl?: string;
    amenities?: string;
    contactPhone?: string;
    contactEmail?: string;
    latitude?: number;
    longitude?: number;
    lowestPrice?: number;
    rooms?: Room[];
}

const HotelDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [bookingModal, setBookingModal] = useState<{ show: boolean; roomId: number | null }>({
        show: false,
        roomId: null,
    });
    const [bookingForm, setBookingForm] = useState({
        checkInDate: '',
        checkOutDate: '',
        numberOfGuests: 1,
        numberOfRooms: 1,
        specialRequests: '',
    });
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        if (id) {
            fetchHotel(parseInt(id));
        }
    }, [id]);

    const fetchHotel = async (hotelId: number) => {
        try {
            setLoading(true);
            const response = await hotelAPI.getById(hotelId);
            setHotel(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load hotel details.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBookRoom = (roomId: number) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        setBookingModal({ show: true, roomId });
        setBookingForm({
            checkInDate: '',
            checkOutDate: '',
            numberOfGuests: 1,
            numberOfRooms: 1,
            specialRequests: '',
        });
        setBookingSuccess(false);
    };

    const submitBooking = async () => {
        if (!bookingModal.roomId || !bookingForm.checkInDate || !bookingForm.checkOutDate || !id) {
            return;
        }

        try {
            setBookingLoading(true);
            const userId = 1; // Should get from auth context
            await hotelAPI.book(userId, {
                hotelId: parseInt(id),
                roomId: bookingModal.roomId,
                checkInDate: bookingForm.checkInDate,
                checkOutDate: bookingForm.checkOutDate,
                numberOfGuests: bookingForm.numberOfGuests,
                numberOfRooms: bookingForm.numberOfRooms,
                specialRequests: bookingForm.specialRequests,
            });
            setBookingSuccess(true);
            // Refresh hotel to update available rooms
            fetchHotel(parseInt(id));
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

    const amenitiesList = hotel?.amenities?.split(',') || [];

    const amenityIcons: Record<string, string> = {
        'WiFi': '📶',
        'Pool': '🏊',
        'Gym': '💪',
        'Spa': '🧖',
        'Restaurant': '🍽️',
        'Bar': '🍸',
        'Parking': '🅿️',
        'AC': '❄️',
        'Room Service': '🛎️',
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error || !hotel) {
        return (
            <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
                <div className="glass-card p-8 text-center max-w-md">
                    <span className="text-6xl mb-4 block">😕</span>
                    <h2 className="text-2xl font-display font-bold text-white mb-2">Hotel Not Found</h2>
                    <p className="text-gray-400 mb-6">{error || 'The hotel you are looking for does not exist.'}</p>
                    <Link to="/hotels" className="btn-primary">
                        Back to Hotels
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
                            <Link to="/destinations" className="text-gray-300 hover:text-white transition-colors">Destinations</Link>
                            <Link to="/hotels" className="text-white font-medium">Hotels</Link>
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
                {hotel.imageUrl ? (
                    <img
                        src={hotel.imageUrl}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                        <span className="text-9xl">🏨</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/50 to-transparent" />

                {/* Breadcrumb */}
                <div className="absolute top-6 left-6">
                    <Link
                        to="/hotels"
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors glass-card px-4 py-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Hotels
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
                                {hotel.starRating && (
                                    <span className="px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium">
                                        {'★'.repeat(hotel.starRating)} {hotel.starRating} Star
                                    </span>
                                )}
                                {hotel.userRating !== undefined && hotel.userRating > 0 && (
                                    <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                                        <span>●</span> {hotel.userRating.toFixed(1)} / 5
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl font-display font-bold text-white mb-3">
                                {hotel.name}
                            </h1>

                            <div className="flex items-center gap-2 text-gray-400 text-lg mb-6">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{hotel.address || hotel.city}</span>
                            </div>

                            {hotel.description && (
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    {hotel.description}
                                </p>
                            )}

                            {/* Amenities */}
                            {amenitiesList.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-3">Amenities</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {amenitiesList.map((amenity, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-dark-200/50 rounded-lg text-gray-300 flex items-center gap-2"
                                            >
                                                <span>{amenityIcons[amenity.trim()] || '✓'}</span>
                                                {amenity.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Rooms Section */}
                        {hotel.rooms && hotel.rooms.length > 0 && (
                            <div className="glass-card p-8">
                                <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="text-2xl">🛏️</span>
                                    Available Rooms
                                </h2>
                                <div className="space-y-4">
                                    {hotel.rooms.map((room) => (
                                        <RoomCard
                                            key={room.id}
                                            id={room.id}
                                            roomType={room.roomType}
                                            pricePerNight={room.pricePerNight}
                                            maxOccupancy={room.maxOccupancy}
                                            totalRooms={room.totalRooms}
                                            availableRooms={room.availableRooms}
                                            amenities={room.amenities}
                                            imageUrl={room.imageUrl}
                                            onBook={handleBookRoom}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Info Cards */}
                    <div className="space-y-6">
                        {/* Price Card */}
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-display font-bold text-white mb-4">Quick Info</h3>
                            <div className="space-y-4">
                                {hotel.lowestPrice && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Starting from</span>
                                        <span className="text-2xl font-bold text-white">
                                            ₹{hotel.lowestPrice.toLocaleString()}/night
                                        </span>
                                    </div>
                                )}
                                {hotel.rooms && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Room Types</span>
                                        <span className="text-white font-semibold">{hotel.rooms.length}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Contact Card */}
                        {(hotel.contactPhone || hotel.contactEmail) && (
                            <div className="glass-card p-6">
                                <h3 className="text-lg font-display font-bold text-white mb-4">Contact</h3>
                                <div className="space-y-3">
                                    {hotel.contactPhone && (
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {hotel.contactPhone}
                                        </div>
                                    )}
                                    {hotel.contactEmail && (
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            {hotel.contactEmail}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Booking Modal */}
            {bookingModal.show && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="glass-card p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        {bookingSuccess ? (
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-white mb-2">Booking Confirmed!</h3>
                                <p className="text-gray-400 mb-6">Your hotel room has been booked successfully.</p>
                                <button
                                    onClick={() => setBookingModal({ show: false, roomId: null })}
                                    className="btn-primary w-full"
                                >
                                    Done
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-display font-bold text-white mb-6">Book Room</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Check-in Date
                                        </label>
                                        <input
                                            type="date"
                                            value={bookingForm.checkInDate}
                                            onChange={(e) => setBookingForm({ ...bookingForm, checkInDate: e.target.value })}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors [color-scheme:dark]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Check-out Date
                                        </label>
                                        <input
                                            type="date"
                                            value={bookingForm.checkOutDate}
                                            onChange={(e) => setBookingForm({ ...bookingForm, checkOutDate: e.target.value })}
                                            min={bookingForm.checkInDate || new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors [color-scheme:dark]"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Guests
                                            </label>
                                            <input
                                                type="number"
                                                value={bookingForm.numberOfGuests}
                                                onChange={(e) => setBookingForm({ ...bookingForm, numberOfGuests: parseInt(e.target.value) || 1 })}
                                                min={1}
                                                max={10}
                                                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Rooms
                                            </label>
                                            <input
                                                type="number"
                                                value={bookingForm.numberOfRooms}
                                                onChange={(e) => setBookingForm({ ...bookingForm, numberOfRooms: parseInt(e.target.value) || 1 })}
                                                min={1}
                                                max={5}
                                                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Special Requests (optional)
                                        </label>
                                        <textarea
                                            value={bookingForm.specialRequests}
                                            onChange={(e) => setBookingForm({ ...bookingForm, specialRequests: e.target.value })}
                                            placeholder="Any special requirements..."
                                            rows={3}
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={() => setBookingModal({ show: false, roomId: null })}
                                        className="flex-1 px-6 py-3 border border-white/20 rounded-xl text-white hover:bg-white/5 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={submitBooking}
                                        disabled={bookingLoading || !bookingForm.checkInDate || !bookingForm.checkOutDate}
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

export default HotelDetail;
