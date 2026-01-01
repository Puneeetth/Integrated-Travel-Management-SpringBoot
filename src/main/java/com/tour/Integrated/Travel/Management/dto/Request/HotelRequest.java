package com.tour.Integrated.Travel.Management.dto.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String city;
    private String address;
    private String description;
    private Integer starRating;
    private String imageUrl;
    private String amenities;
    private String contactPhone;
    private String contactEmail;
    private Double latitude;
    private Double longitude;
}
