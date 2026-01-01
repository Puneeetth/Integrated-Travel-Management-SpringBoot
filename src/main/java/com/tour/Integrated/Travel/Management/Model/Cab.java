package com.tour.Integrated.Travel.Management.Model;

import com.tour.Integrated.Travel.Management.Enum.VehicleType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "cabs")
public class Cab {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String vehicleNumber;

    @NotBlank
    private String vehicleName;

    @Enumerated(EnumType.STRING)
    private VehicleType vehicleType;

    @NotBlank
    private String driverName;

    private String driverPhone;

    private String imageUrl;

    @Min(1)
    private Integer seatingCapacity;

    private Double pricePerKm;

    private Double baseFare;

    private Double rating;

    private Boolean available;

    private String features; // Comma-separated: "AC,Music,GPS"

    @Builder.Default
    @OneToMany(mappedBy = "cab", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<CabBooking> bookings = new ArrayList<>();
}
