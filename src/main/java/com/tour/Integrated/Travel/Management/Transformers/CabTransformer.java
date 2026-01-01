package com.tour.Integrated.Travel.Management.Transformers;

import com.tour.Integrated.Travel.Management.Model.Cab;
import com.tour.Integrated.Travel.Management.dto.Request.CabRequest;
import com.tour.Integrated.Travel.Management.dto.Response.CabResponse;

public class CabTransformer {

    public static Cab cabRequestToCab(CabRequest request) {
        return Cab.builder()
                .vehicleNumber(request.getVehicleNumber())
                .vehicleName(request.getVehicleName())
                .vehicleType(request.getVehicleType())
                .driverName(request.getDriverName())
                .driverPhone(request.getDriverPhone())
                .imageUrl(request.getImageUrl())
                .seatingCapacity(request.getSeatingCapacity())
                .pricePerKm(request.getPricePerKm())
                .baseFare(request.getBaseFare())
                .features(request.getFeatures())
                .available(true)
                .rating(0.0)
                .build();
    }

    public static CabResponse cabToCabResponse(Cab cab) {
        return CabResponse.builder()
                .id(cab.getId())
                .vehicleNumber(cab.getVehicleNumber())
                .vehicleName(cab.getVehicleName())
                .vehicleType(cab.getVehicleType())
                .driverName(cab.getDriverName())
                .driverPhone(cab.getDriverPhone())
                .imageUrl(cab.getImageUrl())
                .seatingCapacity(cab.getSeatingCapacity())
                .pricePerKm(cab.getPricePerKm())
                .baseFare(cab.getBaseFare())
                .rating(cab.getRating())
                .available(cab.getAvailable())
                .features(cab.getFeatures())
                .build();
    }
}
