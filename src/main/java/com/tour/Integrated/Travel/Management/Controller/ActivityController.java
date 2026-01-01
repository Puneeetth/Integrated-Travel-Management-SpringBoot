package com.tour.Integrated.Travel.Management.Controller;

import com.tour.Integrated.Travel.Management.Service.ActivityService;
import com.tour.Integrated.Travel.Management.dto.Request.ActivityBookingRequest;
import com.tour.Integrated.Travel.Management.dto.Request.ActivityRequest;
import com.tour.Integrated.Travel.Management.dto.Response.ActivityBookingResponse;
import com.tour.Integrated.Travel.Management.dto.Response.ActivityResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "*")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @PostMapping
    public ResponseEntity<ActivityResponse> createActivity(@Valid @RequestBody ActivityRequest request) {
        ActivityResponse response = activityService.createActivity(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ActivityResponse>> getAllActivities() {
        List<ActivityResponse> activities = activityService.getAllActivities();
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActivityResponse> getActivityById(@PathVariable Long id) {
        ActivityResponse response = activityService.getActivityById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/destination/{destinationId}")
    public ResponseEntity<List<ActivityResponse>> getActivitiesByDestination(@PathVariable Long destinationId) {
        List<ActivityResponse> activities = activityService.getActivitiesByDestination(destinationId);
        return ResponseEntity.ok(activities);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ActivityResponse> updateActivity(
            @PathVariable Long id,
            @Valid @RequestBody ActivityRequest request) {
        ActivityResponse response = activityService.updateActivity(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
        activityService.deleteActivity(id);
        return ResponseEntity.noContent().build();
    }

    // Booking endpoints
    @PostMapping("/book/{userId}")
    public ResponseEntity<ActivityBookingResponse> bookActivity(
            @PathVariable Long userId,
            @Valid @RequestBody ActivityBookingRequest request) {
        ActivityBookingResponse response = activityService.bookActivity(userId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/bookings/user/{userId}")
    public ResponseEntity<List<ActivityBookingResponse>> getBookingsForUser(@PathVariable Long userId) {
        List<ActivityBookingResponse> bookings = activityService.getBookingsForUser(userId);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/bookings/{bookingId}")
    public ResponseEntity<ActivityBookingResponse> getBookingById(@PathVariable Long bookingId) {
        ActivityBookingResponse response = activityService.getBookingById(bookingId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/bookings/{bookingId}/cancel")
    public ResponseEntity<ActivityBookingResponse> cancelBooking(@PathVariable Long bookingId) {
        ActivityBookingResponse response = activityService.cancelBooking(bookingId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/bookings/{bookingId}/confirm")
    public ResponseEntity<ActivityBookingResponse> confirmBooking(@PathVariable Long bookingId) {
        ActivityBookingResponse response = activityService.confirmBooking(bookingId);
        return ResponseEntity.ok(response);
    }
}
