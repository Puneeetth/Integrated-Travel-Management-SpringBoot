package com.tour.Integrated.Travel.Management.Transformers;

import com.tour.Integrated.Travel.Management.Model.HotelBooking;
import com.tour.Integrated.Travel.Management.dto.Response.HotelBookingResponse;

import java.time.temporal.ChronoUnit;

public class HotelBookingTransformer {

    public static HotelBookingResponse bookingToBookingResponse(HotelBooking booking) {
        long numberOfNights = 0;
        if (booking.getCheckInDate() != null && booking.getCheckOutDate() != null) {
            numberOfNights = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
        }

        return HotelBookingResponse.builder()
                .id(booking.getId())
                .hotelId(booking.getHotel() != null ? booking.getHotel().getId() : null)
                .hotelName(booking.getHotel() != null ? booking.getHotel().getName() : null)
                .hotelCity(booking.getHotel() != null ? booking.getHotel().getCity() : null)
                .hotelImageUrl(booking.getHotel() != null ? booking.getHotel().getImageUrl() : null)
                .roomId(booking.getHotelRoom() != null ? booking.getHotelRoom().getId() : null)
                .roomType(booking.getHotelRoom() != null ? booking.getHotelRoom().getRoomType() : null)
                .pricePerNight(booking.getHotelRoom() != null ? booking.getHotelRoom().getPricePerNight() : null)
                .checkInDate(booking.getCheckInDate())
                .checkOutDate(booking.getCheckOutDate())
                .numberOfGuests(booking.getNumberOfGuests())
                .numberOfRooms(booking.getNumberOfRooms())
                .totalPrice(booking.getTotalPrice())
                .status(booking.getStatus())
                .specialRequests(booking.getSpecialRequests())
                .userId(booking.getUser() != null ? booking.getUser().getId() : null)
                .userName(booking.getUser() != null ? booking.getUser().getName() : null)
                .numberOfNights(numberOfNights)
                .build();
    }
}
