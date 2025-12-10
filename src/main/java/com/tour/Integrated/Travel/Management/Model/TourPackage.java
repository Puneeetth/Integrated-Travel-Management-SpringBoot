package com.tour.Integrated.Travel.Management.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "tour_packages")
public class TourPackage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String title;
    @NotBlank
    @Column(length = 2000)
    private String description;
    @Min(1)
    private Integer totalSeats;
    @Min(0)
    private Integer availableSeats;
    @Positive
    private Double price;
    private LocalDate startDate;
    private LocalDate endDate;
    @Version
    private Long version;

    @OneToMany(mappedBy = "tourPackage", fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    private List<Itinerary> itineraryList = new ArrayList<>();

    @OneToMany(mappedBy = "tourPackage", fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "tourPackage", fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    private List<Booking> bookings = new ArrayList<>();


}
