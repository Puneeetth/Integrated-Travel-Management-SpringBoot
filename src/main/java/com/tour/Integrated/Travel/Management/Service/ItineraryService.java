package com.tour.Integrated.Travel.Management.Service;


import com.tour.Integrated.Travel.Management.Model.Itinerary;
import com.tour.Integrated.Travel.Management.Model.TourPackage;
import com.tour.Integrated.Travel.Management.Repository.ItineraryRepository;
import com.tour.Integrated.Travel.Management.Repository.TourPackageRepository;
import com.tour.Integrated.Travel.Management.Transformers.ItineraryTransformer;
import com.tour.Integrated.Travel.Management.dto.Request.ItineraryRequest;
import com.tour.Integrated.Travel.Management.dto.Response.ItineraryResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItineraryService {

    private final ItineraryRepository itineraryRepo;
    private final TourPackageRepository packageRepo;

    public ItineraryService(ItineraryRepository itineraryRepo, TourPackageRepository packageRepo) {
        this.itineraryRepo = itineraryRepo;
        this.packageRepo = packageRepo;
    }

    public ItineraryResponse addItinerary(Long packageId, ItineraryRequest req) {

        TourPackage tour = packageRepo.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        Itinerary itinerary = ItineraryTransformer.itineraryRequestToItinerary(req, tour);

        Itinerary saved = itineraryRepo.save(itinerary);

        return ItineraryTransformer.itineraryToItineraryResponse(saved);
    }

    public List<ItineraryResponse> getItinerariesForPackage(Long packageId) {
        return itineraryRepo.findByTourPackageIdOrderByDayNumberAsc(packageId)
                .stream()
                .map(ItineraryTransformer::itineraryToItineraryResponse)
                .toList();
    }


    public void deleteItinerary(Long itineraryId) {
        itineraryRepo.deleteById(itineraryId);
    }
}
