package com.tour.Integrated.Travel.Management.Transformers;

import com.tour.Integrated.Travel.Management.Model.CabBooking;
import com.tour.Integrated.Travel.Management.dto.Response.CabBookingResponse;

public class CabBookingTransformer {

    public static CabBookingResponse bookingToBookingResponse(CabBooking booking) {
        return CabBookingResponse.builder()
                .id(booking.getId())
                .cabId(booking.getCab() != null ? booking.getCab().getId() : null)
                .vehicleName(booking.getCab() != null ? booking.getCab().getVehicleName() : null)
                .vehicleNumber(booking.getCab() != null ? booking.getCab().getVehicleNumber() : null)
                .vehicleType(booking.getCab() != null ? booking.getCab().getVehicleType() : null)
                .driverName(booking.getCab() != null ? booking.getCab().getDriverName() : null)
                .driverPhone(booking.getCab() != null ? booking.getCab().getDriverPhone() : null)
                .cabImageUrl(booking.getCab() != null ? booking.getCab().getImageUrl() : null)
                .pickupLocation(booking.getPickupLocation())
                .dropLocation(booking.getDropLocation())
                .pickupDateTime(booking.getPickupDateTime())
                .distanceKm(booking.getDistanceKm())
                .estimatedFare(booking.getEstimatedFare())
                .finalFare(booking.getFinalFare())
                .status(booking.getStatus())
                .passengerName(booking.getPassengerName())
                .passengerPhone(booking.getPassengerPhone())
                .specialRequests(booking.getSpecialRequests())
                .userId(booking.getUser() != null ? booking.getUser().getId() : null)
                .userName(booking.getUser() != null ? booking.getUser().getName() : null)
                .build();
    }
}
