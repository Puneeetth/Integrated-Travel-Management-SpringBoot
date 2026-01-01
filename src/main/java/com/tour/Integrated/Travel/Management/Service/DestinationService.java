package com.tour.Integrated.Travel.Management.Service;

import com.tour.Integrated.Travel.Management.Enum.DestinationCategory;
import com.tour.Integrated.Travel.Management.Model.Destination;
import com.tour.Integrated.Travel.Management.Repository.DestinationRepository;
import com.tour.Integrated.Travel.Management.Transformers.DestinationTransformer;
import com.tour.Integrated.Travel.Management.dto.Request.DestinationRequest;
import com.tour.Integrated.Travel.Management.dto.Response.DestinationResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DestinationService {

    private final DestinationRepository destinationRepository;

    public DestinationService(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    public DestinationResponse createDestination(DestinationRequest request) {
        Destination destination = DestinationTransformer.destinationRequestToDestination(request);
        Destination saved = destinationRepository.save(destination);
        return DestinationTransformer.destinationToDestinationResponseWithoutActivities(saved);
    }

    public List<DestinationResponse> getAllDestinations() {
        return destinationRepository.findAll()
                .stream()
                .map(DestinationTransformer::destinationToDestinationResponseWithoutActivities)
                .collect(Collectors.toList());
    }

    public DestinationResponse getDestinationById(Long id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Destination not found with id: " + id));
        return DestinationTransformer.destinationToDestinationResponse(destination);
    }

    public List<DestinationResponse> getDestinationsByCategory(DestinationCategory category) {
        return destinationRepository.findByCategory(category)
                .stream()
                .map(DestinationTransformer::destinationToDestinationResponseWithoutActivities)
                .collect(Collectors.toList());
    }

    public List<DestinationResponse> searchDestinations(String city, DestinationCategory category) {
        return destinationRepository.searchDestinations(city, category)
                .stream()
                .map(DestinationTransformer::destinationToDestinationResponseWithoutActivities)
                .collect(Collectors.toList());
    }

    public List<DestinationResponse> searchByKeyword(String keyword) {
        return destinationRepository.searchByKeyword(keyword)
                .stream()
                .map(DestinationTransformer::destinationToDestinationResponseWithoutActivities)
                .collect(Collectors.toList());
    }

    public DestinationResponse updateDestination(Long id, DestinationRequest request) {
        Destination existing = destinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Destination not found with id: " + id));

        existing.setName(request.getName());
        existing.setCity(request.getCity());
        existing.setState(request.getState());
        existing.setCountry(request.getCountry());
        existing.setDescription(request.getDescription());
        existing.setCategory(request.getCategory());
        existing.setImageUrl(request.getImageUrl());
        existing.setLatitude(request.getLatitude());
        existing.setLongitude(request.getLongitude());
        existing.setBestTimeToVisit(request.getBestTimeToVisit());
        existing.setEntryFee(request.getEntryFee());

        Destination saved = destinationRepository.save(existing);
        return DestinationTransformer.destinationToDestinationResponseWithoutActivities(saved);
    }

    public void deleteDestination(Long id) {
        if (!destinationRepository.existsById(id)) {
            throw new RuntimeException("Destination not found with id: " + id);
        }
        destinationRepository.deleteById(id);
    }
}
