import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

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

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Welcome Section */}
                <div className="mb-12">
                    <h1 className="text-4xl font-display font-bold text-white mb-2">Welcome Back! 👋</h1>
                    <p className="text-gray-400">Ready to plan your next adventure?</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'My Bookings', value: '3', icon: '📅', color: 'from-primary-500 to-primary-600' },
                        { label: 'Wishlist', value: '12', icon: '❤️', color: 'from-pink-500 to-rose-600' },
                        { label: 'Reviews', value: '5', icon: '⭐', color: 'from-yellow-500 to-orange-600' },
                        { label: 'Points', value: '2,450', icon: '🎁', color: 'from-green-500 to-emerald-600' },
                    ].map((stat, index) => (
                        <div key={index} className="glass-card p-6 card-hover">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-3xl">{stat.icon}</span>
                                <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white text-xs font-semibold`}>
                                    Active
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="mb-12">
                    <h2 className="text-2xl font-display font-bold text-white mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link to="/destinations" className="glass-card p-6 text-left hover:bg-white/10 transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors">
                                <svg className="w-6 h-6 text-primary-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Explore Destinations</h3>
                            <p className="text-gray-400 text-sm">Discover amazing places to visit</p>
                        </Link>

                        <Link to="/my-bookings" className="glass-card p-6 text-left hover:bg-white/10 transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-secondary-500/20 flex items-center justify-center mb-4 group-hover:bg-secondary-500 transition-colors">
                                <svg className="w-6 h-6 text-secondary-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">My Bookings</h3>
                            <p className="text-gray-400 text-sm">View and manage your bookings</p>
                        </Link>

                        <Link to="/cabs" className="glass-card p-6 text-left hover:bg-white/10 transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
                                <svg className="w-6 h-6 text-green-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Book a Cab</h3>
                            <p className="text-gray-400 text-sm">Get comfortable rides</p>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div>
                    <h2 className="text-2xl font-display font-bold text-white mb-6">Recent Activity</h2>
                    <div className="glass-card overflow-hidden">
                        <div className="p-6 border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                                    <span className="text-xl">🏖️</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-medium">Booked Bali Paradise Package</h4>
                                    <p className="text-gray-400 text-sm">2 days ago</p>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                                    Confirmed
                                </span>
                            </div>
                        </div>
                        <div className="p-6 border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                    <span className="text-xl">⭐</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-medium">Left a review for Swiss Alps Tour</h4>
                                    <p className="text-gray-400 text-sm">1 week ago</p>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">
                                    5 Stars
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                                    <span className="text-xl">❤️</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-medium">Added Maldives to Wishlist</h4>
                                    <p className="text-gray-400 text-sm">2 weeks ago</p>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-xs font-medium">
                                    Saved
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
