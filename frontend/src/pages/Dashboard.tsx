import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { activityAPI, hotelAPI, cabAPI, paymentAPI } from '../services/api';

interface UserStats {
    totalBookings: number;
    pendingPayments: number;
    confirmedBookings: number;
    points: number;
}

interface RecentBooking {
    id: number;
    type: 'hotel' | 'cab' | 'activity';
    name: string;
    date: string;
    status: string;
    amount: number;
}

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<UserStats>({
        totalBookings: 0,
        pendingPayments: 0,
        confirmedBookings: 0,
        points: 0
    });
    const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('Traveler');

    const userId = 1; // TODO: Get from auth context

    useEffect(() => {
        fetchDashboardData();
        // Try to get user name from token
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.name) setUserName(payload.name);
            }
        } catch (e) {
            console.error('Error parsing token:', e);
        }
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [activityRes, hotelRes, cabRes] = await Promise.all([
                activityAPI.getBookingsForUser(userId),
                hotelAPI.getBookingsForUser(userId),
                cabAPI.getBookingsForUser(userId)
            ]);

            const allBookings: RecentBooking[] = [];

            // Process activity bookings
            activityRes.data.forEach((b: any) => {
                allBookings.push({
                    id: b.id,
                    type: 'activity',
                    name: b.activityName || 'Activity Booking',
                    date: b.bookingDate,
                    status: b.status,
                    amount: b.totalPrice || 0
                });
            });

            // Process hotel bookings
            hotelRes.data.forEach((b: any) => {
                allBookings.push({
                    id: b.id,
                    type: 'hotel',
                    name: b.hotelName || 'Hotel Booking',
                    date: b.checkInDate,
                    status: b.status,
                    amount: b.totalPrice || 0
                });
            });

            // Process cab bookings
            cabRes.data.forEach((b: any) => {
                allBookings.push({
                    id: b.id,
                    type: 'cab',
                    name: b.vehicleName || 'Cab Booking',
                    date: b.pickupDateTime,
                    status: b.status,
                    amount: b.estimatedFare || 0
                });
            });

            // Sort by date (most recent first)
            allBookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            // Calculate stats
            const totalBookings = allBookings.length;
            const pendingPayments = allBookings.filter(b => b.status === 'PENDING').length;
            const confirmedBookings = allBookings.filter(b => b.status === 'CONFIRMED').length;
            const points = confirmedBookings * 100; // 100 points per confirmed booking

            setStats({ totalBookings, pendingPayments, confirmedBookings, points });
            setRecentBookings(allBookings.slice(0, 5)); // Show only 5 most recent

        } catch (err) {
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const getTimeOfDay = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const statusColors: Record<string, string> = {
        PENDING: 'bg-amber-500/20 text-amber-400',
        CONFIRMED: 'bg-emerald-500/20 text-emerald-400',
        COMPLETED: 'bg-blue-500/20 text-blue-400',
        CANCELLED: 'bg-red-500/20 text-red-400'
    };

    const typeIcons: Record<string, JSX.Element> = {
        hotel: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        cab: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
        ),
        activity: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    };

    const typeColors: Record<string, string> = {
        hotel: 'from-blue-500 to-cyan-500',
        cab: 'from-green-500 to-emerald-500',
        activity: 'from-purple-500 to-pink-500'
    };

    return (
        <div className="min-h-screen bg-hero-gradient">
            {/* Header */}
            <header className="glass-navbar sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-xl font-display font-bold text-white">
                                Travel<span className="gradient-text">Ease</span>
                            </span>
                        </div>
                        <nav className="hidden md:flex items-center gap-6">
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
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Welcome Section */}
                <div className="mb-12 flex items-center justify-between flex-wrap gap-6">
                    <div>
                        <h1 className="text-4xl font-display font-bold text-white mb-2">
                            {getTimeOfDay()}, <span className="gradient-text">{userName}</span>! 👋
                        </h1>
                        <p className="text-gray-400">Ready to plan your next adventure?</p>
                    </div>
                    {stats.pendingPayments > 0 && (
                        <Link
                            to="/payment"
                            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg animate-pulse"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {stats.pendingPayments} Payment{stats.pendingPayments > 1 ? 's' : ''} Pending
                        </Link>
                    )}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Total Bookings */}
                    <Link to="/my-bookings" className="glass-card p-6 card-hover group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center group-hover:from-primary-500 group-hover:to-primary-600 transition-all">
                                <svg className="w-7 h-7 text-primary-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs font-semibold">
                                All Time
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-white mb-1">{loading ? '...' : stats.totalBookings}</div>
                        <div className="text-gray-400 text-sm font-medium">Total Bookings</div>
                    </Link>

                    {/* Confirmed */}
                    <Link to="/my-bookings" className="glass-card p-6 card-hover group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-600/20 flex items-center justify-center group-hover:from-emerald-500 group-hover:to-green-600 transition-all">
                                <svg className="w-7 h-7 text-emerald-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                                Active
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-white mb-1">{loading ? '...' : stats.confirmedBookings}</div>
                        <div className="text-gray-400 text-sm font-medium">Confirmed</div>
                    </Link>

                    {/* Pending Payments */}
                    <Link to="/payment" className="glass-card p-6 card-hover group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center group-hover:from-amber-500 group-hover:to-orange-600 transition-all">
                                <svg className="w-7 h-7 text-amber-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <div className={`px-3 py-1 rounded-full ${stats.pendingPayments > 0 ? 'bg-amber-500/10 text-amber-400' : 'bg-gray-500/10 text-gray-400'} text-xs font-semibold`}>
                                {stats.pendingPayments > 0 ? 'Action Required' : 'All Clear'}
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-white mb-1">{loading ? '...' : stats.pendingPayments}</div>
                        <div className="text-gray-400 text-sm font-medium">Pending Payments</div>
                    </Link>

                    {/* Points */}
                    <div className="glass-card p-6 card-hover group relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-full blur-2xl"></div>
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-600/20 flex items-center justify-center group-hover:from-yellow-500 group-hover:to-amber-600 transition-all">
                                <svg className="w-7 h-7 text-yellow-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-semibold">
                                Rewards
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-white mb-1 relative z-10">{loading ? '...' : stats.points.toLocaleString()}</div>
                        <div className="text-gray-400 text-sm font-medium relative z-10">Points Earned</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-12">
                    <h2 className="text-2xl font-display font-bold text-white mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link to="/destinations" className="glass-card p-6 text-left hover:bg-white/10 transition-all group border border-transparent hover:border-primary-500/30">
                            <div className="w-14 h-14 rounded-2xl bg-primary-500/20 flex items-center justify-center mb-4 group-hover:bg-primary-500 group-hover:scale-110 transition-all">
                                <svg className="w-7 h-7 text-primary-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Explore Destinations</h3>
                            <p className="text-gray-400 text-sm">Discover amazing places</p>
                        </Link>

                        <Link to="/hotels" className="glass-card p-6 text-left hover:bg-white/10 transition-all group border border-transparent hover:border-blue-500/30">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:scale-110 transition-all">
                                <svg className="w-7 h-7 text-blue-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Book Hotels</h3>
                            <p className="text-gray-400 text-sm">Find perfect stays</p>
                        </Link>

                        <Link to="/cabs" className="glass-card p-6 text-left hover:bg-white/10 transition-all group border border-transparent hover:border-green-500/30">
                            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mb-4 group-hover:bg-green-500 group-hover:scale-110 transition-all">
                                <svg className="w-7 h-7 text-green-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Book a Cab</h3>
                            <p className="text-gray-400 text-sm">Comfortable rides</p>
                        </Link>

                        <Link to="/my-bookings" className="glass-card p-6 text-left hover:bg-white/10 transition-all group border border-transparent hover:border-secondary-500/30">
                            <div className="w-14 h-14 rounded-2xl bg-secondary-500/20 flex items-center justify-center mb-4 group-hover:bg-secondary-500 group-hover:scale-110 transition-all">
                                <svg className="w-7 h-7 text-secondary-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">My Bookings</h3>
                            <p className="text-gray-400 text-sm">View all bookings</p>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-display font-bold text-white">Recent Activity</h2>
                        <Link to="/my-bookings" className="text-primary-400 hover:text-primary-300 text-sm font-medium">
                            View All →
                        </Link>
                    </div>
                    <div className="glass-card overflow-hidden">
                        {loading ? (
                            <div className="p-12 text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
                            </div>
                        ) : recentBookings.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gray-500/10 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-medium mb-2">No bookings yet</h3>
                                <p className="text-gray-400 text-sm mb-4">Start exploring and book your first adventure!</p>
                                <Link to="/destinations" className="btn-primary text-sm px-6 py-2">
                                    Explore Destinations
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-white/5">
                                {recentBookings.map((booking, index) => (
                                    <div key={`${booking.type}-${booking.id}`} className="p-5 hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${typeColors[booking.type]} flex items-center justify-center text-white`}>
                                                {typeIcons[booking.type]}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-medium truncate">{booking.name}</h4>
                                                <p className="text-gray-400 text-sm">{formatDate(booking.date)}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status] || 'bg-gray-500/20 text-gray-400'}`}>
                                                    {booking.status}
                                                </span>
                                                <p className="text-white font-medium mt-1">₹{booking.amount.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
