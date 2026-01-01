package com.tour.Integrated.Travel.Management.Transformers;

import com.tour.Integrated.Travel.Management.Model.Destination;
import com.tour.Integrated.Travel.Management.dto.Request.DestinationRequest;
import com.tour.Integrated.Travel.Management.dto.Response.DestinationResponse;

import java.util.Collections;
import java.util.stream.Collectors;

public class DestinationTransformer {

    public static Destination destinationRequestToDestination(DestinationRequest request) {
        return Destination.builder()
                .name(request.getName())
                .city(request.getCity())
                .state(request.getState())
                .country(request.getCountry())
                .description(request.getDescription())
                .category(request.getCategory())
                .imageUrl(request.getImageUrl())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .bestTimeToVisit(request.getBestTimeToVisit())
                .entryFee(request.getEntryFee())
                .rating(0.0)
                .build();
    }

    public static DestinationResponse destinationToDestinationResponse(Destination destination) {
        return DestinationResponse.builder()
                .id(destination.getId())
                .name(destination.getName())
                .city(destination.getCity())
                .state(destination.getState())
                .country(destination.getCountry())
                .description(destination.getDescription())
                .category(destination.getCategory())
                .rating(destination.getRating())
                .imageUrl(destination.getImageUrl())
                .latitude(destination.getLatitude())
                .longitude(destination.getLongitude())
                .bestTimeToVisit(destination.getBestTimeToVisit())
                .entryFee(destination.getEntryFee())
                .activities(destination.getActivities() != null ? destination.getActivities().stream()
                        .map(ActivityTransformer::activityToActivityResponse)
                        .collect(Collectors.toList())
                        : Collections.emptyList())
                .build();
    }

    public static DestinationResponse destinationToDestinationResponseWithoutActivities(Destination destination) {
        return DestinationResponse.builder()
                .id(destination.getId())
                .name(destination.getName())
                .city(destination.getCity())
                .state(destination.getState())
                .country(destination.getCountry())
                .description(destination.getDescription())
                .category(destination.getCategory())
                .rating(destination.getRating())
                .imageUrl(destination.getImageUrl())
                .latitude(destination.getLatitude())
                .longitude(destination.getLongitude())
                .bestTimeToVisit(destination.getBestTimeToVisit())
                .entryFee(destination.getEntryFee())
                .activities(Collections.emptyList())
                .build();
    }
}
