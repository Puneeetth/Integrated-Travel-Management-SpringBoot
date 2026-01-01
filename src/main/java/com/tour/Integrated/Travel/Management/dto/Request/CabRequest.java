package com.tour.Integrated.Travel.Management.dto.Request;

import com.tour.Integrated.Travel.Management.Enum.VehicleType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CabRequest {
    @NotBlank
    private String vehicleNumber;
    @NotBlank
    private String vehicleName;
    @NotNull
    private VehicleType vehicleType;
    @NotBlank
    private String driverName;
    private String driverPhone;
    private String imageUrl;
    private Integer seatingCapacity;
    private Double pricePerKm;
    private Double baseFare;
    private String features;
}
