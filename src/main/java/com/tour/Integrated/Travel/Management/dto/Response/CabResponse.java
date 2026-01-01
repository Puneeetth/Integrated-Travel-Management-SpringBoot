package com.tour.Integrated.Travel.Management.dto.Response;

import com.tour.Integrated.Travel.Management.Enum.VehicleType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CabResponse {
    private Long id;
    private String vehicleNumber;
    private String vehicleName;
    private VehicleType vehicleType;
    private String driverName;
    private String driverPhone;
    private String imageUrl;
    private Integer seatingCapacity;
    private Double pricePerKm;
    private Double baseFare;
    private Double rating;
    private Boolean available;
    private String features;
}
