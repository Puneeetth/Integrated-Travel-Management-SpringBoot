import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CabCard from '../components/CabCard';
import { cabAPI } from '../services/api';

interface Cab {
    id: number;
    vehicleName: string;
    vehicleNumber?: string;
    vehicleType: string;
    driverName?: string;
    driverPhone?: string;
    imageUrl?: string;
    seatingCapacity?: number;
    pricePerKm?: number;
    baseFare?: number;
    rating?: number;
    available?: boolean;
    features?: string;
}

const vehicleTypes = [
    { value: '', label: 'All Types' },
    { value: 'HATCHBACK', label: '🚗 Hatchback' },
    { value: 'SEDAN', label: '🚙 Sedan' },
    { value: 'SUV', label: '🚐 SUV' },
    { value: 'MUV', label: '🚌 MUV' },
    { value: 'LUXURY', label: '🏎️ Luxury' },
    { value: 'TEMPO_TRAVELLER', label: '🚎 Tempo Traveller' },
];

const Cabs = () => {
    const navigate = useNavigate();
    const [cabs, setCabs] = useState<Cab[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [showAvailableOnly, setShowAvailableOnly] = useState(false);

    // Booking modal
    const [bookingModal, setBookingModal] = useState<{ show: boolean; cabId: number | null }>({
        show: false,
        cabId: null,
    });
    const [bookingForm, setBookingForm] = useState({
        pickupLocation: '',
        dropLocation: '',
        pickupDateTime: '',
        distanceKm: 10,
        passengerName: '',
        passengerPhone: '',
        specialRequests: '',
    });
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        fetchCabs();
    }, [selectedType, showAvailableOnly]);

    const fetchCabs = async () => {
        try {
            setLoading(true);
            let response;

            if (showAvailableOnly && selectedType) {
                response = await cabAPI.getAvailableByType(selectedType);
            } else if (showAvailableOnly) {
                response = await cabAPI.getAvailable();
            } else if (selectedType) {
                response = await cabAPI.getByType(selectedType);
            } else {
                response = await cabAPI.getAll();
            }

            setCabs(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load cabs. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBookCab = (cabId: number) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        setBookingModal({ show: true, cabId });
        setBookingForm({
            pickupLocation: '',
            dropLocation: '',
            pickupDateTime: '',
            distanceKm: 10,
            passengerName: '',
            passengerPhone: '',
            specialRequests: '',
        });
        setBookingSuccess(false);
    };

    const submitBooking = async () => {
        if (!bookingModal.cabId || !bookingForm.pickupLocation || !bookingForm.dropLocation || !bookingForm.pickupDateTime) {
            return;
        }

        try {
            setBookingLoading(true);
            const userId = 1;
            await cabAPI.book(userId, {
                cabId: bookingModal.cabId,
                pickupLocation: bookingForm.pickupLocation,
                dropLocation: bookingForm.dropLocation,
                pickupDateTime: bookingForm.pickupDateTime,
                distanceKm: bookingForm.distanceKm,
                passengerName: bookingForm.passengerName,
                passengerPhone: bookingForm.passengerPhone,
                specialRequests: bookingForm.specialRequests,
            });
            setBookingSuccess(true);
            fetchCabs();
        } catch (err) {
            setError('Booking failed. Please try again.');
            console.error(err);
        } finally {
            setBookingLoading(false);
        }
    };

    const selectedCab = cabs.find(c => c.id === bookingModal.cabId);
    const estimatedFare = selectedCab
        ? (selectedCab.baseFare || 50) + (bookingForm.distanceKm * (selectedCab.pricePerKm || 15))
        : 0;

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

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
                            <Link to="/hotels" className="text-gray-300 hover:text-white transition-colors">Hotels</Link>
                            <Link to="/cabs" className="text-white font-medium">Cabs</Link>
                            <Link to="/my-bookings" className="text-gray-300 hover:text-white transition-colors">My Bookings</Link>
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

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Book a <span className="gradient-text">Cab</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Comfortable rides at affordable prices
                    </p>
                </div>

                {/* Filters */}
                <div className="glass-card p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Vehicle Type Filter */}
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="px-4 py-3 bg-dark-200/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors flex-1"
                        >
                            {vehicleTypes.map((type) => (
                                <option key={type.value} value={type.value} className="bg-dark-200">
                                    {type.label}
                                </option>
                            ))}
                        </select>

                        {/* Available Only Toggle */}
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showAvailableOnly}
                                onChange={(e) => setShowAvailableOnly(e.target.checked)}
                                className="w-5 h-5 rounded bg-dark-200 border-white/10 text-primary-500 focus:ring-primary-500"
                            />
                            <span className="text-gray-300">Available only</span>
                        </label>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="glass-card p-4 mb-8 border border-red-500/20 bg-red-500/10">
                        <p className="text-red-400 text-center">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                    </div>
                ) : cabs.length === 0 ? (
                    /* Empty State */
                    <div className="glass-card p-12 text-center">
                        <span className="text-6xl mb-4 block">🚕</span>
                        <h3 className="text-xl font-display font-bold text-white mb-2">No Cabs Found</h3>
                        <p className="text-gray-400 mb-6">Try adjusting your filters</p>
                        <button
                            onClick={() => {
                                setSelectedType('');
                                setShowAvailableOnly(false);
                            }}
                            className="btn-primary"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    /* Cabs List */
                    <div className="space-y-4">
                        {cabs.map((cab) => (
                            <CabCard
                                key={cab.id}
                                id={cab.id}
                                vehicleName={cab.vehicleName}
                                vehicleNumber={cab.vehicleNumber}
                                vehicleType={cab.vehicleType}
                                driverName={cab.driverName}
                                imageUrl={cab.imageUrl}
                                seatingCapacity={cab.seatingCapacity}
                                pricePerKm={cab.pricePerKm}
                                baseFare={cab.baseFare}
                                rating={cab.rating}
                                available={cab.available}
                                features={cab.features}
                                onBook={handleBookCab}
                            />
                        ))}
                    </div>
                )}
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
                                <h3 className="text-2xl font-display font-bold text-white mb-2">Cab Booked!</h3>
                                <p className="text-gray-400 mb-6">Your cab has been booked successfully.</p>
                                <button onClick={() => setBookingModal({ show: false, cabId: null })} className="btn-primary w-full">
                                    Done
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-display font-bold text-white mb-6">Book Cab</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Location</label>
                                        <input
                                            type="text"
                                            value={bookingForm.pickupLocation}
                                            onChange={(e) => setBookingForm({ ...bookingForm, pickupLocation: e.target.value })}
                                            placeholder="Enter pickup address"
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Drop Location</label>
                                        <input
                                            type="text"
                                            value={bookingForm.dropLocation}
                                            onChange={(e) => setBookingForm({ ...bookingForm, dropLocation: e.target.value })}
                                            placeholder="Enter drop address"
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Date & Time</label>
                                        <input
                                            type="datetime-local"
                                            value={bookingForm.pickupDateTime}
                                            onChange={(e) => setBookingForm({ ...bookingForm, pickupDateTime: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors [color-scheme:dark]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Estimated Distance (km)</label>
                                        <input
                                            type="number"
                                            value={bookingForm.distanceKm}
                                            onChange={(e) => setBookingForm({ ...bookingForm, distanceKm: parseInt(e.target.value) || 10 })}
                                            min={1}
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Passenger Name</label>
                                            <input
                                                type="text"
                                                value={bookingForm.passengerName}
                                                onChange={(e) => setBookingForm({ ...bookingForm, passengerName: e.target.value })}
                                                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                value={bookingForm.passengerPhone}
                                                onChange={(e) => setBookingForm({ ...bookingForm, passengerPhone: e.target.value })}
                                                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Estimated Fare Display */}
                                    <div className="glass-card p-4 mt-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400">Estimated Fare</span>
                                            <span className="text-2xl font-bold text-white">₹{estimatedFare.toFixed(0)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={() => setBookingModal({ show: false, cabId: null })}
                                        className="flex-1 px-6 py-3 border border-white/20 rounded-xl text-white hover:bg-white/5 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={submitBooking}
                                        disabled={bookingLoading || !bookingForm.pickupLocation || !bookingForm.dropLocation || !bookingForm.pickupDateTime}
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

export default Cabs;
