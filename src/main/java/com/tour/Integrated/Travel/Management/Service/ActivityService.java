package com.tour.Integrated.Travel.Management.Service;

import com.tour.Integrated.Travel.Management.Enum.ActivityBookingStatus;
import com.tour.Integrated.Travel.Management.Model.Activity;
import com.tour.Integrated.Travel.Management.Model.ActivityBooking;
import com.tour.Integrated.Travel.Management.Model.Destination;
import com.tour.Integrated.Travel.Management.Model.User;
import com.tour.Integrated.Travel.Management.Repository.ActivityBookingRepository;
import com.tour.Integrated.Travel.Management.Repository.ActivityRepository;
import com.tour.Integrated.Travel.Management.Repository.DestinationRepository;
import com.tour.Integrated.Travel.Management.Repository.UserRepository;
import com.tour.Integrated.Travel.Management.Transformers.ActivityBookingTransformer;
import com.tour.Integrated.Travel.Management.Transformers.ActivityTransformer;
import com.tour.Integrated.Travel.Management.dto.Request.ActivityBookingRequest;
import com.tour.Integrated.Travel.Management.dto.Request.ActivityRequest;
import com.tour.Integrated.Travel.Management.dto.Response.ActivityBookingResponse;
import com.tour.Integrated.Travel.Management.dto.Response.ActivityResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final ActivityBookingRepository activityBookingRepository;
    private final DestinationRepository destinationRepository;
    private final UserRepository userRepository;

    public ActivityService(ActivityRepository activityRepository,
            ActivityBookingRepository activityBookingRepository,
            DestinationRepository destinationRepository,
            UserRepository userRepository) {
        this.activityRepository = activityRepository;
        this.activityBookingRepository = activityBookingRepository;
        this.destinationRepository = destinationRepository;
        this.userRepository = userRepository;
    }

    public ActivityResponse createActivity(ActivityRequest request) {
        Destination destination = destinationRepository.findById(request.getDestinationId())
                .orElseThrow(
                        () -> new RuntimeException("Destination not found with id: " + request.getDestinationId()));

        Activity activity = ActivityTransformer.activityRequestToActivity(request, destination);
        Activity saved = activityRepository.save(activity);
        return ActivityTransformer.activityToActivityResponse(saved);
    }

    public List<ActivityResponse> getAllActivities() {
        return activityRepository.findAll()
                .stream()
                .map(ActivityTransformer::activityToActivityResponse)
                .collect(Collectors.toList());
    }

    public ActivityResponse getActivityById(Long id) {
        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));
        return ActivityTransformer.activityToActivityResponse(activity);
    }

    public List<ActivityResponse> getActivitiesByDestination(Long destinationId) {
        return activityRepository.findByDestinationId(destinationId)
                .stream()
                .map(ActivityTransformer::activityToActivityResponse)
                .collect(Collectors.toList());
    }

    public ActivityResponse updateActivity(Long id, ActivityRequest request) {
        Activity existing = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));

        if (!existing.getDestination().getId().equals(request.getDestinationId())) {
            Destination newDestination = destinationRepository.findById(request.getDestinationId())
                    .orElseThrow(() -> new RuntimeException("Destination not found"));
            existing.setDestination(newDestination);
        }

        existing.setName(request.getName());
        existing.setDescription(request.getDescription());
        existing.setDuration(request.getDuration());
        existing.setPrice(request.getPrice());
        existing.setMaxParticipants(request.getMaxParticipants());
        existing.setImageUrl(request.getImageUrl());

        Activity saved = activityRepository.save(existing);
        return ActivityTransformer.activityToActivityResponse(saved);
    }

    public void deleteActivity(Long id) {
        if (!activityRepository.existsById(id)) {
            throw new RuntimeException("Activity not found with id: " + id);
        }
        activityRepository.deleteById(id);
    }

    @Transactional
    public ActivityBookingResponse bookActivity(Long userId, ActivityBookingRequest request) {
        Activity activity = activityRepository.findById(request.getActivityId())
                .orElseThrow(() -> new RuntimeException("Activity not found"));

        if (activity.getAvailableSlots() < request.getNumberOfParticipants()) {
            throw new RuntimeException("Not enough slots available. Available: " + activity.getAvailableSlots());
        }

        int updated = activityRepository.decrementAvailableSlotsIfEnough(
                request.getActivityId(), request.getNumberOfParticipants());

        if (updated == 0) {
            throw new RuntimeException("Could not book activity - slots may have been taken");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Double totalPrice = activity.getPrice() * request.getNumberOfParticipants();

        ActivityBooking booking = ActivityBooking.builder()
                .user(user)
                .activity(activity)
                .bookingDate(request.getBookingDate())
                .numberOfParticipants(request.getNumberOfParticipants())
                .totalPrice(totalPrice)
                .status(ActivityBookingStatus.PENDING)
                .build();

        ActivityBooking saved = activityBookingRepository.save(booking);
        return ActivityBookingTransformer.bookingToBookingResponse(saved);
    }

    public List<ActivityBookingResponse> getBookingsForUser(Long userId) {
        return activityBookingRepository.findByUserId(userId)
                .stream()
                .map(ActivityBookingTransformer::bookingToBookingResponse)
                .collect(Collectors.toList());
    }

    public ActivityBookingResponse getBookingById(Long bookingId) {
        ActivityBooking booking = activityBookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return ActivityBookingTransformer.bookingToBookingResponse(booking);
    }

    @Transactional
    public ActivityBookingResponse cancelBooking(Long bookingId) {
        ActivityBooking booking = activityBookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() == ActivityBookingStatus.CANCELLED) {
            throw new RuntimeException("Booking is already cancelled");
        }

        // Restore available slots
        activityRepository.incrementAvailableSlots(
                booking.getActivity().getId(), booking.getNumberOfParticipants());

        booking.setStatus(ActivityBookingStatus.CANCELLED);
        ActivityBooking saved = activityBookingRepository.save(booking);
        return ActivityBookingTransformer.bookingToBookingResponse(saved);
    }

    @Transactional
    public ActivityBookingResponse confirmBooking(Long bookingId) {
        ActivityBooking booking = activityBookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(ActivityBookingStatus.CONFIRMED);
        ActivityBooking saved = activityBookingRepository.save(booking);
        return ActivityBookingTransformer.bookingToBookingResponse(saved);
    }
}
