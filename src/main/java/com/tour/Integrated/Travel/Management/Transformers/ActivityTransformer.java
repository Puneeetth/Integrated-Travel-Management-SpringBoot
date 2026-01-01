package com.tour.Integrated.Travel.Management.Transformers;

import com.tour.Integrated.Travel.Management.Model.Activity;
import com.tour.Integrated.Travel.Management.Model.Destination;
import com.tour.Integrated.Travel.Management.dto.Request.ActivityRequest;
import com.tour.Integrated.Travel.Management.dto.Response.ActivityResponse;

public class ActivityTransformer {

    public static Activity activityRequestToActivity(ActivityRequest request, Destination destination) {
        return Activity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .duration(request.getDuration())
                .price(request.getPrice())
                .maxParticipants(request.getMaxParticipants())
                .availableSlots(request.getMaxParticipants())
                .imageUrl(request.getImageUrl())
                .destination(destination)
                .build();
    }

    public static ActivityResponse activityToActivityResponse(Activity activity) {
        return ActivityResponse.builder()
                .id(activity.getId())
                .name(activity.getName())
                .description(activity.getDescription())
                .duration(activity.getDuration())
                .price(activity.getPrice())
                .maxParticipants(activity.getMaxParticipants())
                .availableSlots(activity.getAvailableSlots())
                .imageUrl(activity.getImageUrl())
                .destinationId(activity.getDestination() != null ? activity.getDestination().getId() : null)
                .destinationName(activity.getDestination() != null ? activity.getDestination().getName() : null)
                .build();
    }
}
