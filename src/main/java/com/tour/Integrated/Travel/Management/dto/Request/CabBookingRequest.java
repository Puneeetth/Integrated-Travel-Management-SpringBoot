package com.tour.Integrated.Travel.Management.dto.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CabBookingRequest {
    @NotNull
    private Long cabId;
    @NotBlank
    private String pickupLocation;
    @NotBlank
    private String dropLocation;
    @NotNull
    private LocalDateTime pickupDateTime;
    private Double distanceKm;
    private String passengerName;
    private String passengerPhone;
    private String specialRequests;
}
