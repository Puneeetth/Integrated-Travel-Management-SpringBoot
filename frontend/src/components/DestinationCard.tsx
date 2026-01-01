import { Link } from 'react-router-dom';

interface DestinationCardProps {
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

const DestinationCard = ({
    id,
    name,
    city,
    state,
    country,
    description,
    category,
    rating,
    imageUrl,
    entryFee
}: DestinationCardProps) => {
    const categoryColors: Record<string, string> = {
        BEACH: 'from-cyan-500 to-blue-500',
        MOUNTAIN: 'from-emerald-500 to-green-600',
        HERITAGE: 'from-amber-500 to-orange-600',
        ADVENTURE: 'from-red-500 to-pink-600',
        RELIGIOUS: 'from-purple-500 to-indigo-600',
        NATURE: 'from-green-500 to-teal-600',
        CITY: 'from-gray-500 to-slate-600',
        WILDLIFE: 'from-yellow-600 to-amber-700',
    };

    const categoryEmojis: Record<string, string> = {
        BEACH: '🏖️',
        MOUNTAIN: '⛰️',
        HERITAGE: '🏛️',
        ADVENTURE: '🎯',
        RELIGIOUS: '🛕',
        NATURE: '🌿',
        CITY: '🏙️',
        WILDLIFE: '🦁',
    };

    return (
        <Link to={`/destinations/${id}`} className="group">
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
                        <div className={`w-full h-full bg-gradient-to-br ${categoryColors[category || 'NATURE']} flex items-center justify-center`}>
                            <span className="text-6xl">{categoryEmojis[category || 'NATURE']}</span>
                        </div>
                    )}
                    {/* Category Badge */}
                    {category && (
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[category]} text-white text-xs font-semibold`}>
                            {category}
                        </div>
                    )}
                    {/* Rating Badge */}
                    {rating !== undefined && rating > 0 && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            {rating.toFixed(1)}
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
                        <span>{city}{state ? `, ${state}` : ''}{country ? `, ${country}` : ''}</span>
                    </div>

                    {description && (
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                            {description}
                        </p>
                    )}

                    <div className="flex items-center justify-between">
                        {entryFee !== undefined && entryFee > 0 ? (
                            <div className="text-white font-semibold">
                                ₹{entryFee.toLocaleString()}
                                <span className="text-gray-400 text-sm font-normal"> /person</span>
                            </div>
                        ) : (
                            <div className="text-green-400 font-semibold">Free Entry</div>
                        )}
                        <div className="text-primary-400 group-hover:text-primary-300 flex items-center gap-1 text-sm font-medium">
                            Explore
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

export default DestinationCard;
