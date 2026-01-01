import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import { hotelAPI } from '../services/api';

interface Hotel {
    id: number;
    name: string;
    city: string;
    address?: string;
    description?: string;
    starRating?: number;
    userRating?: number;
    imageUrl?: string;
    lowestPrice?: number;
    amenities?: string;
}

const starRatings = [
    { value: 0, label: 'All Stars' },
    { value: 3, label: '3 Star & above' },
    { value: 4, label: '4 Star & above' },
    { value: 5, label: '5 Star' },
];

const Hotels = () => {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [selectedStarRating, setSelectedStarRating] = useState(0);

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            setLoading(true);
            const response = await hotelAPI.getAll();
            setHotels(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load hotels. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            if (searchCity.trim() || selectedStarRating > 0) {
                const response = await hotelAPI.search(
                    searchCity.trim() || undefined,
                    selectedStarRating > 0 ? selectedStarRating : undefined
                );
                setHotels(response.data);
            } else {
                await fetchHotels();
            }
            setError('');
        } catch (err) {
            setError('Search failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Find Your Perfect <span className="gradient-text">Stay</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Discover comfortable hotels at the best prices
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="glass-card p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* City Search */}
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Search by city..."
                                value={searchCity}
                                onChange={(e) => setSearchCity(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="w-full px-4 py-3 pl-12 bg-dark-200/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                            />
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Star Rating Filter */}
                        <select
                            value={selectedStarRating}
                            onChange={(e) => setSelectedStarRating(parseInt(e.target.value))}
                            className="px-4 py-3 bg-dark-200/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-colors"
                        >
                            {starRatings.map((rating) => (
                                <option key={rating.value} value={rating.value} className="bg-dark-200">
                                    {rating.label}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleSearch}
                            className="btn-primary px-8"
                        >
                            Search
                        </button>
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
                ) : hotels.length === 0 ? (
                    /* Empty State */
                    <div className="glass-card p-12 text-center">
                        <span className="text-6xl mb-4 block">🏨</span>
                        <h3 className="text-xl font-display font-bold text-white mb-2">No Hotels Found</h3>
                        <p className="text-gray-400 mb-6">Try adjusting your search criteria</p>
                        <button
                            onClick={() => {
                                setSearchCity('');
                                setSelectedStarRating(0);
                                fetchHotels();
                            }}
                            className="btn-primary"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    /* Hotels Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hotels.map((hotel) => (
                            <HotelCard
                                key={hotel.id}
                                id={hotel.id}
                                name={hotel.name}
                                city={hotel.city}
                                address={hotel.address}
                                description={hotel.description}
                                starRating={hotel.starRating}
                                userRating={hotel.userRating}
                                imageUrl={hotel.imageUrl}
                                lowestPrice={hotel.lowestPrice}
                                amenities={hotel.amenities}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Hotels;
