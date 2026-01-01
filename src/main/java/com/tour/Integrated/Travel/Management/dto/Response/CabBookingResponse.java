package com.tour.Integrated.Travel.Management.dto.Response;

import com.tour.Integrated.Travel.Management.Enum.CabBookingStatus;
import com.tour.Integrated.Travel.Management.Enum.VehicleType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CabBookingResponse {
    private Long id;
    private Long cabId;
    private String vehicleName;
    private String vehicleNumber;
    private VehicleType vehicleType;
    private String driverName;
    private String driverPhone;
    private String cabImageUrl;
    private String pickupLocation;
    private String dropLocation;
    private LocalDateTime pickupDateTime;
    private Double distanceKm;
    private Double estimatedFare;
    private Double finalFare;
    private CabBookingStatus status;
    private String passengerName;
    private String passengerPhone;
    private String specialRequests;
    private Long userId;
    private String userName;
}
