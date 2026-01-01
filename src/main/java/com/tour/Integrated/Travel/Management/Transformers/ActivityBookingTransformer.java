package com.tour.Integrated.Travel.Management.Transformers;

import com.tour.Integrated.Travel.Management.Model.ActivityBooking;
import com.tour.Integrated.Travel.Management.dto.Response.ActivityBookingResponse;

public class ActivityBookingTransformer {

    public static ActivityBookingResponse bookingToBookingResponse(ActivityBooking booking) {
        return ActivityBookingResponse.builder()
                .id(booking.getId())
                .activityId(booking.getActivity() != null ? booking.getActivity().getId() : null)
                .activityName(booking.getActivity() != null ? booking.getActivity().getName() : null)
                .destinationId(booking.getActivity() != null && booking.getActivity().getDestination() != null
                        ? booking.getActivity().getDestination().getId()
                        : null)
                .destinationName(booking.getActivity() != null && booking.getActivity().getDestination() != null
                        ? booking.getActivity().getDestination().getName()
                        : null)
                .bookingDate(booking.getBookingDate())
                .numberOfParticipants(booking.getNumberOfParticipants())
                .totalPrice(booking.getTotalPrice())
                .status(booking.getStatus())
                .userId(booking.getUser() != null ? booking.getUser().getId() : null)
                .userName(booking.getUser() != null ? booking.getUser().getName() : null)
                .build();
    }
}
