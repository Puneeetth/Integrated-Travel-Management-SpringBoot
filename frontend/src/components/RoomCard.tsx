interface RoomCardProps {
    id: number;
    roomType: string;
    pricePerNight: number;
    maxOccupancy?: number;
    totalRooms?: number;
    availableRooms?: number;
    amenities?: string;
    imageUrl?: string;
    onBook?: (id: number) => void;
}

const RoomCard = ({
    id,
    roomType,
    pricePerNight,
    maxOccupancy,
    totalRooms,
    availableRooms,
    amenities,
    imageUrl,
    onBook
}: RoomCardProps) => {
    const isAvailable = availableRooms === undefined || availableRooms > 0;
    const amenitiesList = amenities?.split(',') || [];

    const roomTypeLabels: Record<string, string> = {
        SINGLE: 'Single Room',
        DOUBLE: 'Double Room',
        TWIN: 'Twin Room',
        SUITE: 'Suite',
        DELUXE: 'Deluxe Room',
        FAMILY: 'Family Room',
    };

    const roomTypeIcons: Record<string, string> = {
        SINGLE: '🛏️',
        DOUBLE: '🛏️🛏️',
        TWIN: '🛏️🛏️',
        SUITE: '🏰',
        DELUXE: '👑',
        FAMILY: '👨‍👩‍👧‍👦',
    };

    return (
        <div className="glass-card overflow-hidden card-hover">
            <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative w-full md:w-56 h-40 md:h-auto overflow-hidden flex-shrink-0">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={roomType}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                            <span className="text-4xl">{roomTypeIcons[roomType] || '🛏️'}</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 p-5">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-display font-bold text-white mb-2">
                                {roomTypeLabels[roomType] || roomType}
                            </h3>

                            <div className="flex flex-wrap gap-4 mb-3">
                                {maxOccupancy && (
                                    <div className="flex items-center gap-1.5 text-sm text-gray-300">
                                        <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Max {maxOccupancy} guests
                                    </div>
                                )}
                                {availableRooms !== undefined && (
                                    <div className={`flex items-center gap-1.5 text-sm ${availableRooms > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {availableRooms > 0 ? `${availableRooms} rooms left` : 'No rooms available'}
                                    </div>
                                )}
                            </div>

                            {/* Amenities */}
                            {amenitiesList.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {amenitiesList.slice(0, 5).map((amenity, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-dark-200/50 rounded text-xs text-gray-400"
                                        >
                                            {amenity.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-row md:flex-col items-center md:items-end gap-3">
                            <div className="text-right">
                                <div className="text-2xl font-bold text-white">
                                    ₹{pricePerNight.toLocaleString()}
                                </div>
                                <div className="text-gray-400 text-xs">per night</div>
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

export default RoomCard;
