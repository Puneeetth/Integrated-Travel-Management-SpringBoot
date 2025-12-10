package com.tour.Integrated.Travel.Management.dto.Response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItineraryResponse {

    private Long id;
    private Integer dayNumber;
    private String details;
    private Long packageId;
}
