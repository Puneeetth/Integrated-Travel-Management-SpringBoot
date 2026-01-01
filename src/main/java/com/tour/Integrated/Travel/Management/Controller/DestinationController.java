package com.tour.Integrated.Travel.Management.Controller;

import com.tour.Integrated.Travel.Management.Enum.DestinationCategory;
import com.tour.Integrated.Travel.Management.Service.DestinationService;
import com.tour.Integrated.Travel.Management.dto.Request.DestinationRequest;
import com.tour.Integrated.Travel.Management.dto.Response.DestinationResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "*")
public class DestinationController {

    private final DestinationService destinationService;

    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }

    @PostMapping
    public ResponseEntity<DestinationResponse> createDestination(@Valid @RequestBody DestinationRequest request) {
        DestinationResponse response = destinationService.createDestination(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<DestinationResponse>> getAllDestinations() {
        List<DestinationResponse> destinations = destinationService.getAllDestinations();
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DestinationResponse> getDestinationById(@PathVariable Long id) {
        DestinationResponse response = destinationService.getDestinationById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<DestinationResponse>> getByCategory(@PathVariable DestinationCategory category) {
        List<DestinationResponse> destinations = destinationService.getDestinationsByCategory(category);
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/search")
    public ResponseEntity<List<DestinationResponse>> searchDestinations(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) DestinationCategory category) {
        List<DestinationResponse> destinations = destinationService.searchDestinations(city, category);
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/search/keyword")
    public ResponseEntity<List<DestinationResponse>> searchByKeyword(@RequestParam String keyword) {
        List<DestinationResponse> destinations = destinationService.searchByKeyword(keyword);
        return ResponseEntity.ok(destinations);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DestinationResponse> updateDestination(
            @PathVariable Long id,
            @Valid @RequestBody DestinationRequest request) {
        DestinationResponse response = destinationService.updateDestination(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDestination(@PathVariable Long id) {
        destinationService.deleteDestination(id);
        return ResponseEntity.noContent().build();
    }
}
