package com.tour.Integrated.Travel.Management.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "activities")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Column(length = 1000)
    private String description;

    private String duration;

    @Positive
    private Double price;

    @Min(1)
    private Integer maxParticipants;

    @Min(0)
    private Integer availableSlots;

    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_id")
    private Destination destination;

    @OneToMany(mappedBy = "activity", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<ActivityBooking> bookings = new ArrayList<>();
}
