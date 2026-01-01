package com.tour.Integrated.Travel.Management.dto.Request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelBookingRequest {
    @NotNull
    private Long hotelId;
    @NotNull
    private Long roomId;
    @NotNull
    private LocalDate checkInDate;
    @NotNull
    private LocalDate checkOutDate;
    @Min(1)
    private Integer numberOfGuests;
    @Min(1)
    private Integer numberOfRooms;
    private String specialRequests;
}
