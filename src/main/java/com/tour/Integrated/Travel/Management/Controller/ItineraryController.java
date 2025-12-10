package com.tour.Integrated.Travel.Management.Controller;

import com.tour.Integrated.Travel.Management.Service.ItineraryService;
import com.tour.Integrated.Travel.Management.dto.Request.ItineraryRequest;
import com.tour.Integrated.Travel.Management.dto.Response.ItineraryResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/itineraries")
public class ItineraryController {

    private final ItineraryService itineraryService;

    public ItineraryController(ItineraryService itineraryService) {
        this.itineraryService = itineraryService;
    }

    @PostMapping("/{packageId}")
    public ItineraryResponse createItinerary(@PathVariable Long packageId,
                                             @Valid @RequestBody ItineraryRequest req) {
        return itineraryService.addItinerary(packageId, req);
    }

    @GetMapping("/package/{packageId}")
    public List<ItineraryResponse> getItineraries(@PathVariable Long packageId) {
        return itineraryService.getItinerariesForPackage(packageId);
    }

    @DeleteMapping("/{id}")
    public void deleteItinerary(@PathVariable Long id) {
        itineraryService.deleteItinerary(id);
    }
}