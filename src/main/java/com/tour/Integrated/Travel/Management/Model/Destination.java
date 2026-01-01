package com.tour.Integrated.Travel.Management.Model;

import com.tour.Integrated.Travel.Management.Enum.DestinationCategory;
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
@Table(name = "destinations")
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String city;

    private String state;

    private String country;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    private DestinationCategory category;

    @Min(0)
    @Max(5)
    private Double rating;

    private String imageUrl;

    private Double latitude;

    private Double longitude;

    private String bestTimeToVisit;

    private Double entryFee;

    @Builder.Default
    @OneToMany(mappedBy = "destination", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Activity> activities = new ArrayList<>();
}
