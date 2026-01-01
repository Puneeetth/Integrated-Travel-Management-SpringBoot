package com.tour.Integrated.Travel.Management.dto.Response;

import com.tour.Integrated.Travel.Management.Enum.RoomType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelRoomResponse {
    private Long id;
    private RoomType roomType;
    private String roomNumber;
    private Double pricePerNight;
    private Integer maxOccupancy;
    private Integer totalRooms;
    private Integer availableRooms;
    private String amenities;
    private String imageUrl;
    private Long hotelId;
    private String hotelName;
}
