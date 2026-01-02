import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { paymentAPI, activityAPI, hotelAPI, cabAPI } from '../services/api';

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface PendingBooking {
    id: number;
    type: 'hotel' | 'cab' | 'activity';
    name: string;
    details: string;
    amount: number;
    status: string;
}

interface PaymentInfo {
    id: number;
    razorpayOrderId: string;
    razorpayKeyId: string;
    amount: number;
    currency: string;
}

const Payment = () => {
    const navigate = useNavigate();
    const [pendingBookings, setPendingBookings] = useState<PendingBooking[]>([]);
    const [selectedBookings, setSelectedBookings] = useState<{
        hotelBookingIds: number[];
        cabBookingIds: number[];
        activityBookingIds: number[];
    }>({ hotelBookingIds: [], cabBookingIds: [], activityBookingIds: [] });
    const [loading, setLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const userId = 1; // TODO: Get from auth context

    useEffect(() => {
        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        fetchPendingBookings();

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const fetchPendingBookings = async () => {
        try {
            setLoading(true);
            const [activityRes, hotelRes, cabRes] = await Promise.all([
                activityAPI.getBookingsForUser(userId),
                hotelAPI.getBookingsForUser(userId),
                cabAPI.getBookingsForUser(userId)
            ]);

            const bookings: PendingBooking[] = [];

            // Filter pending bookings
            activityRes.data.filter((b: any) => b.status === 'PENDING').forEach((b: any) => {
                bookings.push({
                    id: b.id,
                    type: 'activity',
                    name: b.activityName || 'Activity',
                    details: `${b.numberOfParticipants} participant(s) on ${new Date(b.bookingDate).toLocaleDateString()}`,
                    amount: b.totalPrice || 0,
                    status: b.status
                });
            });

            hotelRes.data.filter((b: any) => b.status === 'PENDING').forEach((b: any) => {
                bookings.push({
                    id: b.id,
                    type: 'hotel',
                    name: b.hotelName || 'Hotel',
                    details: `${b.numberOfNights || 1} night(s), ${b.numberOfGuests} guest(s)`,
                    amount: b.totalPrice || 0,
                    status: b.status
                });
            });

            cabRes.data.filter((b: any) => b.status === 'PENDING').forEach((b: any) => {
                bookings.push({
                    id: b.id,
                    type: 'cab',
                    name: b.vehicleName || 'Cab',
                    details: `${b.pickupLocation} → ${b.dropLocation}`,
                    amount: b.estimatedFare || 0,
                    status: b.status
                });
            });

            setPendingBookings(bookings);

            // Auto-select all pending bookings
            const hotelIds = bookings.filter(b => b.type === 'hotel').map(b => b.id);
            const cabIds = bookings.filter(b => b.type === 'cab').map(b => b.id);
            const activityIds = bookings.filter(b => b.type === 'activity').map(b => b.id);
            setSelectedBookings({ hotelBookingIds: hotelIds, cabBookingIds: cabIds, activityBookingIds: activityIds });

        } catch (err) {
            setError('Failed to load bookings');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleBooking = (booking: PendingBooking) => {
        setSelectedBookings(prev => {
            if (booking.type === 'hotel') {
                const exists = prev.hotelBookingIds.includes(booking.id);
                return {
                    ...prev,
                    hotelBookingIds: exists
                        ? prev.hotelBookingIds.filter(id => id !== booking.id)
                        : [...prev.hotelBookingIds, booking.id]
                };
            } else if (booking.type === 'cab') {
                const exists = prev.cabBookingIds.includes(booking.id);
                return {
                    ...prev,
                    cabBookingIds: exists
                        ? prev.cabBookingIds.filter(id => id !== booking.id)
                        : [...prev.cabBookingIds, booking.id]
                };
            } else {
                const exists = prev.activityBookingIds.includes(booking.id);
                return {
                    ...prev,
                    activityBookingIds: exists
                        ? prev.activityBookingIds.filter(id => id !== booking.id)
                        : [...prev.activityBookingIds, booking.id]
                };
            }
        });
    };

    const isSelected = (booking: PendingBooking): boolean => {
        if (booking.type === 'hotel') return selectedBookings.hotelBookingIds.includes(booking.id);
        if (booking.type === 'cab') return selectedBookings.cabBookingIds.includes(booking.id);
        return selectedBookings.activityBookingIds.includes(booking.id);
    };

    const calculateTotal = (): number => {
        return pendingBookings
            .filter(b => isSelected(b))
            .reduce((sum, b) => sum + b.amount, 0);
    };

    const handlePayment = async () => {
        const total = calculateTotal();
        if (total <= 0) {
            setError('Please select at least one booking to pay');
            return;
        }

        try {
            setPaymentLoading(true);
            setError('');

            // Create Razorpay order
            const orderRes = await paymentAPI.createOrder(userId, selectedBookings);
            const order: PaymentInfo = orderRes.data;

            // Open Razorpay checkout
            const options = {
                key: order.razorpayKeyId,
                amount: order.amount * 100,
                currency: order.currency || 'INR',
                name: 'TravelEase',
                description: 'Booking Payment',
                order_id: order.razorpayOrderId,
                handler: async function (response: any) {
                    try {
                        // Verify payment
                        await paymentAPI.verifyPayment({
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        });
                        setSuccess(true);
                    } catch (err) {
                        setError('Payment verification failed');
                        console.error(err);
                    }
                },
                prefill: {
                    name: 'User',
                    email: 'user@example.com'
                },
                theme: {
                    color: '#8B5CF6'
                }
            };

            const razor = new window.Razorpay(options);
            razor.on('payment.failed', function (response: any) {
                setError('Payment failed: ' + response.error.description);
            });
            razor.open();

        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to create payment order');
            console.error(err);
        } finally {
            setPaymentLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const bookingTypeIcons: Record<string, string> = {
        hotel: '🏨',
        cab: '🚕',
        activity: '🎯'
    };

    if (success) {
        return (
            <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
                <div className="glass-card p-12 text-center max-w-md">
                    <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-display font-bold text-white mb-4">Payment Successful!</h2>
                    <p className="text-gray-400 mb-8">Your bookings have been confirmed.</p>
                    <Link to="/my-bookings" className="btn-primary inline-block">
                        View My Bookings
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
                            <Link to="/hotels" className="text-gray-300 hover:text-white transition-colors">Hotels</Link>
                            <Link to="/cabs" className="text-gray-300 hover:text-white transition-colors">Cabs</Link>
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
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-display font-bold text-white mb-4">
                        Complete <span className="gradient-text">Payment</span>
                    </h1>
                    <p className="text-gray-400">Review and pay for your pending bookings</p>
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
                ) : pendingBookings.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                        <span className="text-6xl mb-4 block">✅</span>
                        <h3 className="text-xl font-display font-bold text-white mb-2">No Pending Payments</h3>
                        <p className="text-gray-400 mb-6">All your bookings are paid for!</p>
                        <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Bookings List */}
                        <div className="lg:col-span-2 space-y-4">
                            <h2 className="text-xl font-display font-bold text-white mb-4">Pending Bookings</h2>
                            {pendingBookings.map((booking) => (
                                <div
                                    key={`${booking.type}-${booking.id}`}
                                    onClick={() => toggleBooking(booking)}
                                    className={`glass-card p-5 cursor-pointer transition-all border-2 ${isSelected(booking) ? 'border-primary-500' : 'border-transparent hover:border-white/10'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isSelected(booking) ? 'bg-primary-500 border-primary-500' : 'border-gray-500'}`}>
                                            {isSelected(booking) && (
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-3xl">{bookingTypeIcons[booking.type]}</span>
                                        <div className="flex-1">
                                            <h3 className="text-white font-semibold">{booking.name}</h3>
                                            <p className="text-gray-400 text-sm">{booking.details}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-bold text-lg">₹{booking.amount.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Payment Summary */}
                        <div className="lg:col-span-1">
                            <div className="glass-card p-6 sticky top-24">
                                <h2 className="text-xl font-display font-bold text-white mb-6">Payment Summary</h2>

                                <div className="space-y-3 mb-6">
                                    {pendingBookings.filter(b => isSelected(b)).map((booking) => (
                                        <div key={`${booking.type}-${booking.id}`} className="flex justify-between text-sm">
                                            <span className="text-gray-400">{bookingTypeIcons[booking.type]} {booking.name}</span>
                                            <span className="text-white">₹{booking.amount.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-white/10 pt-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg text-white font-semibold">Total</span>
                                        <span className="text-2xl font-bold text-white">₹{calculateTotal().toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={paymentLoading || calculateTotal() <= 0}
                                    className="w-full py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {paymentLoading ? 'Processing...' : `Pay ₹${calculateTotal().toLocaleString()}`}
                                </button>

                                <p className="text-gray-500 text-xs text-center mt-4">
                                    Secured by Razorpay
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Payment;
