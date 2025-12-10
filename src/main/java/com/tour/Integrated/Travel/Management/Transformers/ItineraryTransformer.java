package com.tour.Integrated.Travel.Management.Transformers;

import com.tour.Integrated.Travel.Management.Model.Itinerary;
import com.tour.Integrated.Travel.Management.Model.TourPackage;
import com.tour.Integrated.Travel.Management.dto.Request.ItineraryRequest;
import com.tour.Integrated.Travel.Management.dto.Response.ItineraryResponse;

public class ItineraryTransformer {
    public static Itinerary itineraryRequestToItinerary(ItineraryRequest req, TourPackage tourPackage) {
        return Itinerary.builder()
                .dayNumber(req.getDayNumber())
                .details(req.getDetails())
                .tourPackage(tourPackage)
                .build();
    }

    public static ItineraryResponse itineraryToItineraryResponse(Itinerary i) {
        return ItineraryResponse.builder()
                .id(i.getId())
                .dayNumber(i.getDayNumber())
                .details(i.getDetails())
                .packageId(i.getTourPackage().getId())
                .build();
    }
}
