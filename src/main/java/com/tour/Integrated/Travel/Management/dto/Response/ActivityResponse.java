package com.tour.Integrated.Travel.Management.dto.Response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityResponse {
    private Long id;
    private String name;
    private String description;
    private String duration;
    private Double price;
    private Integer maxParticipants;
    private Integer availableSlots;
    private String imageUrl;
    private Long destinationId;
    private String destinationName;
}
