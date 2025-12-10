package com.tour.Integrated.Travel.Management.dto.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItineraryRequest {

    private Long packageId;  // admin chooses which package this belongs to

    private Integer dayNumber;

    private String details;
}