package com.tour.Integrated.Travel.Management.dto.Request;

import com.tour.Integrated.Travel.Management.Enum.DestinationCategory;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DestinationRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String city;
    private String state;
    private String country;
    private String description;
    private DestinationCategory category;
    private String imageUrl;
    private Double latitude;
    private Double longitude;
    private String bestTimeToVisit;
    private Double entryFee;
}
