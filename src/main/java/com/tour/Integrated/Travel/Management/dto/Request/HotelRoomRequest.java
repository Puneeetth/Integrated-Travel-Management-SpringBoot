package com.tour.Integrated.Travel.Management.dto.Request;

import com.tour.Integrated.Travel.Management.Enum.RoomType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelRoomRequest {
    @NotNull
    private RoomType roomType;
    private String roomNumber;
    @Positive
    private Double pricePerNight;
    private Integer maxOccupancy;
    private Integer totalRooms;
    private String amenities;
    private String imageUrl;
    @NotNull
    private Long hotelId;
}
