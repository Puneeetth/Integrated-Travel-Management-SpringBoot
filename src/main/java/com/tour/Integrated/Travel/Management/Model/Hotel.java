package com.tour.Integrated.Travel.Management.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
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
@Table(name = "hotels")
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String city;

    private String address;

    @Column(length = 2000)
    private String description;

    @Min(1)
    @Max(5)
    private Integer starRating;

    @Min(0)
    @Max(5)
    private Double userRating;

    private String imageUrl;

    private String amenities; // Comma-separated: "WiFi,Pool,Gym,Spa"

    private String contactPhone;

    private String contactEmail;

    private Double latitude;

    private Double longitude;

    @Builder.Default
    @OneToMany(mappedBy = "hotel", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<HotelRoom> rooms = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "hotel", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<HotelBooking> bookings = new ArrayList<>();
}
