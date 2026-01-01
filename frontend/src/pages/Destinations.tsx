import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import { destinationAPI } from '../services/api';

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
    entryFee?: number;
}

const categories = [
    { value: '', label: 'All Categories', emoji: '🌍' },
    { value: 'BEACH', label: 'Beaches', emoji: '🏖️' },
    { value: 'MOUNTAIN', label: 'Mountains', emoji: '⛰️' },
    { value: 'HERITAGE', label: 'Heritage', emoji: '🏛️' },
    { value: 'ADVENTURE', label: 'Adventure', emoji: '🎯' },
    { value: 'RELIGIOUS', label: 'Religious', emoji: '🛕' },
    { value: 'NATURE', label: 'Nature', emoji: '🌿' },
    { value: 'CITY', label: 'Cities', emoji: '🏙️' },
    { value: 'WILDLIFE', label: 'Wildlife', emoji: '🦁' },
];

const Destinations = () => {
    const navigate = useNavigate();
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            setLoading(true);
            const response = await destinationAPI.getAll();
            setDestinations(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load destinations. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            if (searchKeyword.trim()) {
                const response = await destinationAPI.searchByKeyword(searchKeyword);
                setDestinations(response.data);
            } else if (selectedCategory) {
                const response = await destinationAPI.getByCategory(selectedCategory);
                setDestinations(response.data);
            } else {
                await fetchDestinations();
            }
            setError('');
        } catch (err) {
            setError('Search failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = async (category: string) => {
        setSelectedCategory(category);
        setSearchKeyword('');
        try {
            setLoading(true);
            if (category) {
                const response = await destinationAPI.getByCategory(category);
                setDestinations(response.data);
            } else {
                await fetchDestinations();
            }
            setError('');
        } catch (err) {
            setError('Failed to filter destinations. Please try again.');
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

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Explore <span className="gradient-text">Destinations</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Discover amazing places to visit, from serene beaches to majestic mountains
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="glass-card p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Search destinations..."
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="w-full px-4 py-3 pl-12 bg-dark-200/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                            />
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <button
                            onClick={handleSearch}
                            className="btn-primary px-8"
                        >
                            Search
                        </button>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-2 mt-6">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => handleCategoryChange(cat.value)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.value
                                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                                        : 'bg-dark-200/50 text-gray-300 hover:bg-dark-200 hover:text-white'
                                    }`}
                            >
                                <span className="mr-1.5">{cat.emoji}</span>
                                {cat.label}
                            </button>
                        ))}
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
                ) : destinations.length === 0 ? (
                    /* Empty State */
                    <div className="glass-card p-12 text-center">
                        <span className="text-6xl mb-4 block">🗺️</span>
                        <h3 className="text-xl font-display font-bold text-white mb-2">No Destinations Found</h3>
                        <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                        <button
                            onClick={() => {
                                setSearchKeyword('');
                                setSelectedCategory('');
                                fetchDestinations();
                            }}
                            className="btn-primary"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    /* Destinations Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {destinations.map((destination) => (
                            <DestinationCard
                                key={destination.id}
                                id={destination.id}
                                name={destination.name}
                                city={destination.city}
                                state={destination.state}
                                country={destination.country}
                                description={destination.description}
                                category={destination.category}
                                rating={destination.rating}
                                imageUrl={destination.imageUrl}
                                entryFee={destination.entryFee}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Destinations;
