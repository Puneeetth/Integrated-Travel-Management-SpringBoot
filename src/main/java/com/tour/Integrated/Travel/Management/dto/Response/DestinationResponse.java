package com.tour.Integrated.Travel.Management.dto.Response;

import com.tour.Integrated.Travel.Management.Enum.DestinationCategory;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DestinationResponse {
    private Long id;
    private String name;
    private String city;
    private String state;
    private String country;
    private String description;
    private DestinationCategory category;
    private Double rating;
    private String imageUrl;
    private Double latitude;
    private Double longitude;
    private String bestTimeToVisit;
    private Double entryFee;
    private List<ActivityResponse> activities;
}
