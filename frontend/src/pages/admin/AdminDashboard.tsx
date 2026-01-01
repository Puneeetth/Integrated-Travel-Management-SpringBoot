import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { destinationAPI, hotelAPI, cabAPI, activityAPI } from '../../services/api';

interface Stats {
    destinations: number;
    hotels: number;
    cabs: number;
    bookings: number;
}

interface Destination {
    id: number;
    name: string;
    city: string;
    category?: string;
    rating?: number;
}

interface Hotel {
    id: number;
    name: string;
    city: string;
    starRating?: number;
}

interface Cab {
    id: number;
    vehicleName: string;
    vehicleNumber?: string;
    vehicleType: string;
    driverName?: string;
    available?: boolean;
}

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<'dashboard' | 'destinations' | 'hotels' | 'cabs'>('dashboard');
    const [stats, setStats] = useState<Stats>({ destinations: 0, hotels: 0, cabs: 0, bookings: 0 });
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [cabs, setCabs] = useState<Cab[]>([]);
    const [loading, setLoading] = useState(true);

    // Form states for creating new items
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});

    useEffect(() => {
        const adminToken = localStorage.getItem('adminToken');
        if (!adminToken) {
            navigate('/admin-portal');
            return;
        }
        fetchAllData();
    }, [navigate]);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const [destRes, hotelRes, cabRes] = await Promise.all([
                destinationAPI.getAll(),
                hotelAPI.getAll(),
                cabAPI.getAll()
            ]);
            setDestinations(destRes.data);
            setHotels(hotelRes.data);
            setCabs(cabRes.data);
            setStats({
                destinations: destRes.data.length,
                hotels: hotelRes.data.length,
                cabs: cabRes.data.length,
                bookings: 0
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin-portal');
    };

    const handleDeleteDestination = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this destination?')) {
            try {
                await destinationAPI.delete(id);
                fetchAllData();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDeleteHotel = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this hotel?')) {
            try {
                await hotelAPI.delete(id);
                fetchAllData();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDeleteCab = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this cab?')) {
            try {
                await cabAPI.delete(id);
                fetchAllData();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleAddDestination = async () => {
        try {
            await destinationAPI.create(formData);
            setShowAddForm(false);
            setFormData({});
            fetchAllData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddHotel = async () => {
        try {
            await hotelAPI.create(formData);
            setShowAddForm(false);
            setFormData({});
            fetchAllData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddCab = async () => {
        try {
            await cabAPI.create(formData);
            setShowAddForm(false);
            setFormData({});
            fetchAllData();
        } catch (err) {
            console.error(err);
        }
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'destinations', label: 'Destinations', icon: '📍' },
        { id: 'hotels', label: 'Hotels', icon: '🏨' },
        { id: 'cabs', label: 'Cabs', icon: '🚕' },
    ];

    const statCards = [
        { label: 'Destinations', value: stats.destinations, icon: '📍', color: 'from-purple-500 to-pink-500' },
        { label: 'Hotels', value: stats.hotels, icon: '🏨', color: 'from-blue-500 to-cyan-500' },
        { label: 'Cabs', value: stats.cabs, icon: '🚕', color: 'from-green-500 to-teal-500' },
        { label: 'Total Bookings', value: stats.bookings, icon: '📅', color: 'from-orange-500 to-red-500' },
    ];

    return (
        <div className="min-h-screen bg-hero-gradient flex">
            {/* Sidebar */}
            <aside className="w-64 glass-card m-4 rounded-2xl p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-lg font-display font-bold text-white">Admin</span>
                        <p className="text-xs text-gray-400">TravelEase</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveSection(item.id as typeof activeSection); setShowAddForm(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeSection === item.id ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all mt-4"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                    </div>
                ) : activeSection === 'dashboard' ? (
                    <>
                        <h1 className="text-3xl font-display font-bold text-white mb-8">Dashboard</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {statCards.map((stat, index) => (
                                <div key={index} className="glass-card p-6">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                                        <span className="text-2xl">{stat.icon}</span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                                    <p className="text-gray-400">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="glass-card p-6">
                            <h2 className="text-xl font-display font-bold text-white mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <button onClick={() => { setActiveSection('destinations'); setShowAddForm(true); }} className="p-4 bg-purple-500/20 rounded-xl text-purple-400 hover:bg-purple-500/30 transition-colors text-left">
                                    <span className="text-2xl mb-2 block">➕</span>
                                    <span className="font-medium">Add Destination</span>
                                </button>
                                <button onClick={() => { setActiveSection('hotels'); setShowAddForm(true); }} className="p-4 bg-blue-500/20 rounded-xl text-blue-400 hover:bg-blue-500/30 transition-colors text-left">
                                    <span className="text-2xl mb-2 block">➕</span>
                                    <span className="font-medium">Add Hotel</span>
                                </button>
                                <button onClick={() => { setActiveSection('cabs'); setShowAddForm(true); }} className="p-4 bg-green-500/20 rounded-xl text-green-400 hover:bg-green-500/30 transition-colors text-left">
                                    <span className="text-2xl mb-2 block">➕</span>
                                    <span className="font-medium">Add Cab</span>
                                </button>
                            </div>
                        </div>
                    </>
                ) : activeSection === 'destinations' ? (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-3xl font-display font-bold text-white">Destinations</h1>
                            <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium">
                                {showAddForm ? 'Cancel' : '+ Add Destination'}
                            </button>
                        </div>

                        {showAddForm && (
                            <div className="glass-card p-6 mb-6">
                                <h3 className="text-lg font-bold text-white mb-4">Add New Destination</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input placeholder="Name" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    <input placeholder="City" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                                    <input placeholder="State" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                                    <input placeholder="Country" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
                                    <input placeholder="Image URL" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} />
                                    <select className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                        <option value="">Select Category</option>
                                        <option value="BEACH">Beach</option>
                                        <option value="MOUNTAIN">Mountain</option>
                                        <option value="HERITAGE">Heritage</option>
                                        <option value="ADVENTURE">Adventure</option>
                                        <option value="RELIGIOUS">Religious</option>
                                        <option value="NATURE">Nature</option>
                                        <option value="CITY">City</option>
                                        <option value="WILDLIFE">Wildlife</option>
                                    </select>
                                </div>
                                <textarea placeholder="Description" className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white mb-4" rows={3} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                                <button onClick={handleAddDestination} className="px-6 py-2 bg-purple-500 text-white rounded-xl font-medium">Save Destination</button>
                            </div>
                        )}

                        <div className="glass-card overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Name</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">City</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Category</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Rating</th>
                                        <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {destinations.map((dest) => (
                                        <tr key={dest.id} className="hover:bg-white/5">
                                            <td className="px-6 py-4 text-white font-medium">{dest.name}</td>
                                            <td className="px-6 py-4 text-gray-400">{dest.city}</td>
                                            <td className="px-6 py-4 text-gray-400">{dest.category || '-'}</td>
                                            <td className="px-6 py-4 text-gray-400">{dest.rating ? `★ ${dest.rating}` : '-'}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleDeleteDestination(dest.id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : activeSection === 'hotels' ? (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-3xl font-display font-bold text-white">Hotels</h1>
                            <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium">
                                {showAddForm ? 'Cancel' : '+ Add Hotel'}
                            </button>
                        </div>

                        {showAddForm && (
                            <div className="glass-card p-6 mb-6">
                                <h3 className="text-lg font-bold text-white mb-4">Add New Hotel</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input placeholder="Hotel Name" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    <input placeholder="City" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                                    <input placeholder="Address" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                    <input placeholder="Star Rating (1-5)" type="number" min="1" max="5" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, starRating: parseInt(e.target.value) })} />
                                    <input placeholder="Image URL" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} />
                                    <input placeholder="Amenities (comma-separated)" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, amenities: e.target.value })} />
                                </div>
                                <textarea placeholder="Description" className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white mb-4" rows={3} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                                <button onClick={handleAddHotel} className="px-6 py-2 bg-blue-500 text-white rounded-xl font-medium">Save Hotel</button>
                            </div>
                        )}

                        <div className="glass-card overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Name</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">City</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Star Rating</th>
                                        <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {hotels.map((hotel) => (
                                        <tr key={hotel.id} className="hover:bg-white/5">
                                            <td className="px-6 py-4 text-white font-medium">{hotel.name}</td>
                                            <td className="px-6 py-4 text-gray-400">{hotel.city}</td>
                                            <td className="px-6 py-4 text-gray-400">{hotel.starRating ? '★'.repeat(hotel.starRating) : '-'}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleDeleteHotel(hotel.id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-3xl font-display font-bold text-white">Cabs</h1>
                            <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-medium">
                                {showAddForm ? 'Cancel' : '+ Add Cab'}
                            </button>
                        </div>

                        {showAddForm && (
                            <div className="glass-card p-6 mb-6">
                                <h3 className="text-lg font-bold text-white mb-4">Add New Cab</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input placeholder="Vehicle Name (e.g. Swift Dzire)" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, vehicleName: e.target.value })} />
                                    <input placeholder="Vehicle Number" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })} />
                                    <select className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}>
                                        <option value="">Select Vehicle Type</option>
                                        <option value="HATCHBACK">Hatchback</option>
                                        <option value="SEDAN">Sedan</option>
                                        <option value="SUV">SUV</option>
                                        <option value="MUV">MUV</option>
                                        <option value="LUXURY">Luxury</option>
                                        <option value="TEMPO_TRAVELLER">Tempo Traveller</option>
                                    </select>
                                    <input placeholder="Driver Name" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, driverName: e.target.value })} />
                                    <input placeholder="Driver Phone" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, driverPhone: e.target.value })} />
                                    <input placeholder="Seating Capacity" type="number" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, seatingCapacity: parseInt(e.target.value) })} />
                                    <input placeholder="Price per KM" type="number" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, pricePerKm: parseFloat(e.target.value) })} />
                                    <input placeholder="Base Fare" type="number" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, baseFare: parseFloat(e.target.value) })} />
                                    <input placeholder="Image URL" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} />
                                    <input placeholder="Features (comma-separated)" className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white" onChange={(e) => setFormData({ ...formData, features: e.target.value })} />
                                </div>
                                <button onClick={handleAddCab} className="px-6 py-2 bg-green-500 text-white rounded-xl font-medium">Save Cab</button>
                            </div>
                        )}

                        <div className="glass-card overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Vehicle</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Number</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Type</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Driver</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                                        <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {cabs.map((cab) => (
                                        <tr key={cab.id} className="hover:bg-white/5">
                                            <td className="px-6 py-4 text-white font-medium">{cab.vehicleName}</td>
                                            <td className="px-6 py-4 text-gray-400">{cab.vehicleNumber || '-'}</td>
                                            <td className="px-6 py-4 text-gray-400">{cab.vehicleType}</td>
                                            <td className="px-6 py-4 text-gray-400">{cab.driverName || '-'}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${cab.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                    {cab.available ? 'Available' : 'Booked'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleDeleteCab(cab.id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
