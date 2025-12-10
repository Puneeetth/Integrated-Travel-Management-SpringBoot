package com.tour.Integrated.Travel.Management.dto.Response;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {
    private Long bookingId;
    private String status;
    private Integer seatsBooked;
    private Long tourPackageId;
    private Long userId;
}
