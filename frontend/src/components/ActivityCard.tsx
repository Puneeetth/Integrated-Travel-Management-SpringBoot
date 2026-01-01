interface ActivityCardProps {
    id: number;
    name: string;
    description?: string;
    duration?: string;
    price: number;
    maxParticipants?: number;
    availableSlots?: number;
    imageUrl?: string;
    destinationName?: string;
    onBook?: (id: number) => void;
}

const ActivityCard = ({
    id,
    name,
    description,
    duration,
    price,
    maxParticipants,
    availableSlots,
    imageUrl,
    destinationName,
    onBook
}: ActivityCardProps) => {
    const isAvailable = availableSlots === undefined || availableSlots > 0;

    return (
        <div className="glass-card overflow-hidden card-hover">
            <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative w-full md:w-48 h-40 md:h-auto overflow-hidden flex-shrink-0">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-secondary-500 to-primary-500 flex items-center justify-center">
                            <span className="text-4xl">🎯</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 p-5">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-display font-bold text-white mb-2">
                                {name}
                            </h3>
                            {destinationName && (
                                <div className="flex items-center gap-1 text-gray-400 text-sm mb-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{destinationName}</span>
                                </div>
                            )}
                            {description && (
                                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                    {description}
                                </p>
                            )}
                            <div className="flex flex-wrap gap-3">
                                {duration && (
                                    <div className="flex items-center gap-1.5 text-sm text-gray-300">
                                        <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {duration}
                                    </div>
                                )}
                                {maxParticipants && (
                                    <div className="flex items-center gap-1.5 text-sm text-gray-300">
                                        <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Max {maxParticipants} people
                                    </div>
                                )}
                                {availableSlots !== undefined && (
                                    <div className={`flex items-center gap-1.5 text-sm ${availableSlots > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {availableSlots > 0 ? `${availableSlots} slots left` : 'Fully booked'}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-row md:flex-col items-center md:items-end gap-3">
                            <div className="text-right">
                                <div className="text-2xl font-bold text-white">
                                    ₹{price.toLocaleString()}
                                </div>
                                <div className="text-gray-400 text-xs">per person</div>
                            </div>
                            {onBook && (
                                <button
                                    onClick={() => onBook(id)}
                                    disabled={!isAvailable}
                                    className={`btn-primary text-sm px-6 py-2 ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isAvailable ? 'Book Now' : 'Sold Out'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
