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
public class ActivityBookingRequest {
    @NotNull
    private Long activityId;
    @NotNull
    private LocalDate bookingDate;
    @Min(1)
    private Integer numberOfParticipants;
}
