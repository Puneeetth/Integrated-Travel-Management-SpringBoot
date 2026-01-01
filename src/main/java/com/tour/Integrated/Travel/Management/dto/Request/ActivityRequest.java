package com.tour.Integrated.Travel.Management.dto.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityRequest {
    @NotBlank
    private String name;
    private String description;
    private String duration;
    @Positive
    private Double price;
    private Integer maxParticipants;
    private String imageUrl;
    @NotNull
    private Long destinationId;
}
