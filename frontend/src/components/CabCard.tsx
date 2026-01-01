

interface CabCardProps {
    id: number;
    vehicleName: string;
    vehicleNumber?: string;
    vehicleType: string;
    driverName?: string;
    imageUrl?: string;
    seatingCapacity?: number;
    pricePerKm?: number;
    baseFare?: number;
    rating?: number;
    available?: boolean;
    features?: string;
    onBook?: (id: number) => void;
}

const vehicleTypeIcons: Record<string, string> = {
    HATCHBACK: '🚗',
    SEDAN: '🚙',
    SUV: '🚐',
    MUV: '🚌',
    LUXURY: '🏎️',
    TEMPO_TRAVELLER: '🚎',
};

const vehicleTypeLabels: Record<string, string> = {
    HATCHBACK: 'Hatchback',
    SEDAN: 'Sedan',
    SUV: 'SUV',
    MUV: 'MUV',
    LUXURY: 'Luxury',
    TEMPO_TRAVELLER: 'Tempo Traveller',
};

const CabCard = ({
    id,
    vehicleName,
    vehicleNumber,
    vehicleType,
    driverName,
    imageUrl,
    seatingCapacity,
    pricePerKm,
    baseFare,
    rating,
    available = true,
    features,
    onBook
}: CabCardProps) => {
    const featuresList = features?.split(',').slice(0, 4) || [];

    return (
        <div className="glass-card overflow-hidden card-hover">
            <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative w-full md:w-48 h-40 md:h-auto overflow-hidden flex-shrink-0">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={vehicleName}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-600 to-teal-700 flex items-center justify-center">
                            <span className="text-5xl">{vehicleTypeIcons[vehicleType] || '🚗'}</span>
                        </div>
                    )}
                    {/* Availability Badge */}
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${available ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                        {available ? 'Available' : 'Booked'}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 bg-primary-500/20 rounded text-xs text-primary-400 font-medium">
                                    {vehicleTypeLabels[vehicleType] || vehicleType}
                                </span>
                                {rating !== undefined && rating > 0 && (
                                    <span className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 rounded text-xs text-yellow-400">
                                        ★ {rating.toFixed(1)}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-lg font-display font-bold text-white mb-1">
                                {vehicleName}
                            </h3>

                            {vehicleNumber && (
                                <p className="text-gray-500 text-sm mb-2">{vehicleNumber}</p>
                            )}

                            <div className="flex flex-wrap gap-4 mb-3 text-sm">
                                {seatingCapacity && (
                                    <div className="flex items-center gap-1.5 text-gray-300">
                                        <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {seatingCapacity} seats
                                    </div>
                                )}
                                {driverName && (
                                    <div className="flex items-center gap-1.5 text-gray-400">
                                        <span>🧑‍✈️</span> {driverName}
                                    </div>
                                )}
                            </div>

                            {/* Features */}
                            {featuresList.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {featuresList.map((feature, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-dark-200/50 rounded text-xs text-gray-400"
                                        >
                                            {feature.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-row md:flex-col items-center md:items-end gap-3">
                            <div className="text-right">
                                {baseFare !== undefined && (
                                    <div className="text-gray-400 text-xs mb-1">
                                        Base: ₹{baseFare}
                                    </div>
                                )}
                                {pricePerKm !== undefined && (
                                    <div className="text-xl font-bold text-white">
                                        ₹{pricePerKm}/km
                                    </div>
                                )}
                            </div>
                            {onBook && (
                                <button
                                    onClick={() => onBook(id)}
                                    disabled={!available}
                                    className={`btn-primary text-sm px-6 py-2 ${!available ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {available ? 'Book Now' : 'Unavailable'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CabCard;
