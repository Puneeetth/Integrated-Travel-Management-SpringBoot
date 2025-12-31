const destinations = [
    {
        id: 1,
        name: 'Santorini, Greece',
        image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=600&q=80',
        price: 1299,
        rating: 4.9,
        days: 7,
        description: 'Experience the stunning sunsets and white-washed buildings',
    },
    {
        id: 2,
        name: 'Bali, Indonesia',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
        price: 899,
        rating: 4.8,
        days: 5,
        description: 'Tropical paradise with ancient temples and rice terraces',
    },
    {
        id: 3,
        name: 'Maldives',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80',
        price: 1899,
        rating: 5.0,
        days: 6,
        description: 'Crystal clear waters and luxury overwater villas',
    },
    {
        id: 4,
        name: 'Swiss Alps',
        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=80',
        price: 1599,
        rating: 4.9,
        days: 8,
        description: 'Majestic mountain peaks and scenic train journeys',
    },
    {
        id: 5,
        name: 'Tokyo, Japan',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80',
        price: 1199,
        rating: 4.7,
        days: 7,
        description: 'Where ancient tradition meets cutting-edge technology',
    },
    {
        id: 6,
        name: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
        price: 1099,
        rating: 4.8,
        days: 5,
        description: 'The city of love, lights, and world-class cuisine',
    },
];

const Destinations = () => {
    return (
        <section id="destinations" className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
                        Popular Destinations
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
                        Explore Top <span className="gradient-text">Destinations</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Discover handpicked destinations loved by travelers worldwide. From tropical beaches to historic cities, find your perfect getaway.
                    </p>
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((destination, index) => (
                        <div
                            key={destination.id}
                            className="glass-card overflow-hidden card-hover group"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />

                                {/* Price Badge */}
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-secondary-500 text-white text-sm font-semibold">
                                    ${destination.price}
                                </div>

                                {/* Rating */}
                                <div className="absolute bottom-4 left-4 flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-white text-sm font-medium">{destination.rating}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{destination.days} Days</span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{destination.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{destination.description}</p>

                                <button className="w-full py-3 rounded-xl bg-white/5 text-white font-medium border border-white/10 hover:bg-primary-500 hover:border-primary-500 transition-all duration-300">
                                    Explore Package
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <button className="btn-outline">
                        View All Destinations
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Destinations;
