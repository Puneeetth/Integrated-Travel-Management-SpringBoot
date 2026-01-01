package com.tour.Integrated.Travel.Management.Controller;

import com.tour.Integrated.Travel.Management.Enum.VehicleType;
import com.tour.Integrated.Travel.Management.Service.CabService;
import com.tour.Integrated.Travel.Management.dto.Request.CabBookingRequest;
import com.tour.Integrated.Travel.Management.dto.Request.CabRequest;
import com.tour.Integrated.Travel.Management.dto.Response.CabBookingResponse;
import com.tour.Integrated.Travel.Management.dto.Response.CabResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cabs")
@CrossOrigin(origins = "*")
public class CabController {

    @Autowired
    private CabService cabService;

    // Cab endpoints
    @PostMapping
    public ResponseEntity<CabResponse> createCab(@Valid @RequestBody CabRequest request) {
        CabResponse response = cabService.createCab(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CabResponse>> getAllCabs() {
        List<CabResponse> cabs = cabService.getAllCabs();
        return ResponseEntity.ok(cabs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CabResponse> getCabById(@PathVariable Long id) {
        CabResponse cab = cabService.getCabById(id);
        return ResponseEntity.ok(cab);
    }

    @GetMapping("/available")
    public ResponseEntity<List<CabResponse>> getAvailableCabs() {
        List<CabResponse> cabs = cabService.getAvailableCabs();
        return ResponseEntity.ok(cabs);
    }

    @GetMapping("/type/{vehicleType}")
    public ResponseEntity<List<CabResponse>> getCabsByType(@PathVariable VehicleType vehicleType) {
        List<CabResponse> cabs = cabService.getCabsByType(vehicleType);
        return ResponseEntity.ok(cabs);
    }

    @GetMapping("/available/{vehicleType}")
    public ResponseEntity<List<CabResponse>> getAvailableCabsByType(@PathVariable VehicleType vehicleType) {
        List<CabResponse> cabs = cabService.getAvailableCabsByType(vehicleType);
        return ResponseEntity.ok(cabs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CabResponse> updateCab(@PathVariable Long id, @Valid @RequestBody CabRequest request) {
        CabResponse response = cabService.updateCab(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCab(@PathVariable Long id) {
        cabService.deleteCab(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/availability")
    public ResponseEntity<Void> setCabAvailability(@PathVariable Long id, @RequestParam Boolean available) {
        cabService.setCabAvailability(id, available);
        return ResponseEntity.ok().build();
    }

    // Booking endpoints
    @PostMapping("/bookings/{userId}")
    public ResponseEntity<CabBookingResponse> bookCab(
            @PathVariable Long userId,
            @Valid @RequestBody CabBookingRequest request) {
        CabBookingResponse response = cabService.bookCab(userId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/bookings/user/{userId}")
    public ResponseEntity<List<CabBookingResponse>> getBookingsForUser(@PathVariable Long userId) {
        List<CabBookingResponse> bookings = cabService.getBookingsForUser(userId);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/bookings/{bookingId}")
    public ResponseEntity<CabBookingResponse> getBookingById(@PathVariable Long bookingId) {
        CabBookingResponse booking = cabService.getBookingById(bookingId);
        return ResponseEntity.ok(booking);
    }

    @PutMapping("/bookings/{bookingId}/cancel")
    public ResponseEntity<CabBookingResponse> cancelBooking(@PathVariable Long bookingId) {
        CabBookingResponse response = cabService.cancelBooking(bookingId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/bookings/{bookingId}/confirm")
    public ResponseEntity<CabBookingResponse> confirmBooking(@PathVariable Long bookingId) {
        CabBookingResponse response = cabService.confirmBooking(bookingId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/bookings/{bookingId}/complete")
    public ResponseEntity<CabBookingResponse> completeBooking(
            @PathVariable Long bookingId,
            @RequestParam(required = false) Double finalFare) {
        CabBookingResponse response = cabService.completeBooking(bookingId, finalFare);
        return ResponseEntity.ok(response);
    }
}
