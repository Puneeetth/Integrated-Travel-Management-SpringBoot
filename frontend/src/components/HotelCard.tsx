import { Link } from 'react-router-dom';

interface HotelCardProps {
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

const HotelCard = ({
    id,
    name,
    city,
    address,
    description,
    starRating,
    userRating,
    imageUrl,
    lowestPrice,
    amenities
}: HotelCardProps) => {
    const amenitiesList = amenities?.split(',').slice(0, 4) || [];

    const amenityIcons: Record<string, string> = {
        'WiFi': '📶',
        'Pool': '🏊',
        'Gym': '💪',
        'Spa': '🧖',
        'Restaurant': '🍽️',
        'Bar': '🍸',
        'Parking': '🅿️',
        'AC': '❄️',
        'TV': '📺',
        'Room Service': '🛎️',
    };

    return (
        <Link to={`/hotels/${id}`} className="group">
            <div className="glass-card overflow-hidden card-hover h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-6xl">🏨</span>
                        </div>
                    )}
                    {/* Star Rating Badge */}
                    {starRating && (
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-yellow-500/90 text-black text-xs font-bold flex items-center gap-1">
                            {'★'.repeat(starRating)}
                        </div>
                    )}
                    {/* User Rating */}
                    {userRating !== undefined && userRating > 0 && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-1">
                            <span className="text-green-400">●</span>
                            {userRating.toFixed(1)} / 5
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                        {name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{address || city}</span>
                    </div>

                    {description && (
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                            {description}
                        </p>
                    )}

                    {/* Amenities */}
                    {amenitiesList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {amenitiesList.map((amenity, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-dark-200/50 rounded text-xs text-gray-300 flex items-center gap-1"
                                >
                                    <span>{amenityIcons[amenity.trim()] || '✓'}</span>
                                    {amenity.trim()}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        {lowestPrice !== undefined && lowestPrice > 0 ? (
                            <div className="text-white font-semibold">
                                <span className="text-gray-400 text-sm font-normal">from </span>
                                ₹{lowestPrice.toLocaleString()}
                                <span className="text-gray-400 text-sm font-normal"> /night</span>
                            </div>
                        ) : (
                            <div className="text-gray-400 text-sm">Check prices</div>
                        )}
                        <div className="text-primary-400 group-hover:text-primary-300 flex items-center gap-1 text-sm font-medium">
                            View Rooms
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default HotelCard;
