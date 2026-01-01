package com.tour.Integrated.Travel.Management.dto.Response;

import com.tour.Integrated.Travel.Management.Enum.HotelBookingStatus;
import com.tour.Integrated.Travel.Management.Enum.RoomType;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelBookingResponse {
    private Long id;
    private Long hotelId;
    private String hotelName;
    private String hotelCity;
    private String hotelImageUrl;
    private Long roomId;
    private RoomType roomType;
    private Double pricePerNight;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer numberOfGuests;
    private Integer numberOfRooms;
    private Double totalPrice;
    private HotelBookingStatus status;
    private String specialRequests;
    private Long userId;
    private String userName;
    private Long numberOfNights;
}
