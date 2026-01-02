import { Link } from 'react-router-dom';

const packages = [
    {
        id: 1,
        name: 'Golden Triangle Tour',
        description: 'Explore Delhi, Agra & Jaipur - India\'s iconic heritage circuit',
        duration: '6 Days / 5 Nights',
        price: 24999,
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
        highlights: ['Taj Mahal', 'Amber Fort', 'Qutub Minar'],
        rating: 4.8
    },
    {
        id: 2,
        name: 'Kerala Backwaters',
        description: 'Experience the serene houseboat stays and lush greenery',
        duration: '5 Days / 4 Nights',
        price: 18999,
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
        highlights: ['Houseboat Stay', 'Tea Gardens', 'Beaches'],
        rating: 4.9
    },
    {
        id: 3,
        name: 'Himalayan Adventure',
        description: 'Trek through breathtaking mountain trails and valleys',
        duration: '7 Days / 6 Nights',
        price: 32999,
        image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800',
        highlights: ['Mountain Treks', 'Camping', 'Monastery Visits'],
        rating: 4.7
    },
    {
        id: 4,
        name: 'Goa Beach Paradise',
        description: 'Sun, sand & sea - the ultimate beach holiday experience',
        duration: '4 Days / 3 Nights',
        price: 14999,
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
        highlights: ['Beach Parties', 'Water Sports', 'Nightlife'],
        rating: 4.6
    }
];

const Packages = () => {
    return (
        <section id="packages" className="py-24 bg-dark-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">Curated Experiences</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3 mb-4">
                        Popular <span className="gradient-text">Packages</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Handpicked travel packages designed to give you the best experiences at unbeatable prices
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {packages.map((pkg) => (
                        <div key={pkg.id} className="glass-card overflow-hidden card-hover group">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={pkg.image}
                                    alt={pkg.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
                                    ⭐ {pkg.rating}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                    <span className="text-white/80 text-sm">{pkg.duration}</span>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-display font-bold text-white mb-2">{pkg.name}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{pkg.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {pkg.highlights.map((highlight, i) => (
                                        <span key={i} className="px-2 py-1 bg-primary-500/10 text-primary-400 text-xs rounded-full">
                                            {highlight}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div>
                                        <span className="text-gray-500 text-xs">Starting from</span>
                                        <div className="text-2xl font-bold text-white">₹{pkg.price.toLocaleString()}</div>
                                    </div>
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-medium rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-xl hover:bg-white/5 transition-all"
                    >
                        View All Packages
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Packages;
