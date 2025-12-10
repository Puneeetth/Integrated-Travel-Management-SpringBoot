package com.tour.Integrated.Travel.Management.Transformers;

import com.tour.Integrated.Travel.Management.Model.TourPackage;
import com.tour.Integrated.Travel.Management.dto.Request.PackageRequest;
import com.tour.Integrated.Travel.Management.dto.Response.PackageResponse;

public class PackageTransformer {

    public static TourPackage packageRequestToTourPackage(PackageRequest req){
        return TourPackage.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .availableSeats(req.getAvailableSeats())
                .price(req.getPrice())
                .startDate(req.getStartDate())
                .endDate(req.getEndDate())
                .build();
    }
    public static PackageResponse tourPackageToPackageResponse(TourPackage t) {
        return PackageResponse.builder()
                .id(t.getId())
                .title(t.getTitle())
                .description(t.getDescription())
                .availableSeats(t.getAvailableSeats())
                .price(t.getPrice())
                .startDate(t.getStartDate())
                .endDate(t.getEndDate())
                .build();
    }
}

