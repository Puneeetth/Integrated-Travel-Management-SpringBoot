package com.tour.Integrated.Travel.Management.Transformers;

import com.tour.Integrated.Travel.Management.Model.Hotel;
import com.tour.Integrated.Travel.Management.Model.HotelRoom;
import com.tour.Integrated.Travel.Management.dto.Request.HotelRoomRequest;
import com.tour.Integrated.Travel.Management.dto.Response.HotelRoomResponse;

public class HotelRoomTransformer {

    public static HotelRoom roomRequestToRoom(HotelRoomRequest request, Hotel hotel) {
        return HotelRoom.builder()
                .roomType(request.getRoomType())
                .roomNumber(request.getRoomNumber())
                .pricePerNight(request.getPricePerNight())
                .maxOccupancy(request.getMaxOccupancy())
                .totalRooms(request.getTotalRooms())
                .availableRooms(request.getTotalRooms())
                .amenities(request.getAmenities())
                .imageUrl(request.getImageUrl())
                .hotel(hotel)
                .build();
    }

    public static HotelRoomResponse roomToRoomResponse(HotelRoom room) {
        return HotelRoomResponse.builder()
                .id(room.getId())
                .roomType(room.getRoomType())
                .roomNumber(room.getRoomNumber())
                .pricePerNight(room.getPricePerNight())
                .maxOccupancy(room.getMaxOccupancy())
                .totalRooms(room.getTotalRooms())
                .availableRooms(room.getAvailableRooms())
                .amenities(room.getAmenities())
                .imageUrl(room.getImageUrl())
                .hotelId(room.getHotel() != null ? room.getHotel().getId() : null)
                .hotelName(room.getHotel() != null ? room.getHotel().getName() : null)
                .build();
    }
}
