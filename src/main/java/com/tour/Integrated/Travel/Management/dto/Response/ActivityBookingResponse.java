package com.tour.Integrated.Travel.Management.dto.Response;

import com.tour.Integrated.Travel.Management.Enum.ActivityBookingStatus;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityBookingResponse {
    private Long id;
    private Long activityId;
    private String activityName;
    private Long destinationId;
    private String destinationName;
    private LocalDate bookingDate;
    private Integer numberOfParticipants;
    private Double totalPrice;
    private ActivityBookingStatus status;
    private Long userId;
    private String userName;
}
