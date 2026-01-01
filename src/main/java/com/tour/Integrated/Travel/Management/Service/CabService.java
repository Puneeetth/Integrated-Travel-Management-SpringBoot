package com.tour.Integrated.Travel.Management.Service;

import com.tour.Integrated.Travel.Management.Enum.CabBookingStatus;
import com.tour.Integrated.Travel.Management.Enum.VehicleType;
import com.tour.Integrated.Travel.Management.Model.Cab;
import com.tour.Integrated.Travel.Management.Model.CabBooking;
import com.tour.Integrated.Travel.Management.Model.User;
import com.tour.Integrated.Travel.Management.Repository.CabBookingRepository;
import com.tour.Integrated.Travel.Management.Repository.CabRepository;
import com.tour.Integrated.Travel.Management.Repository.UserRepository;
import com.tour.Integrated.Travel.Management.Transformers.CabBookingTransformer;
import com.tour.Integrated.Travel.Management.Transformers.CabTransformer;
import com.tour.Integrated.Travel.Management.dto.Request.CabBookingRequest;
import com.tour.Integrated.Travel.Management.dto.Request.CabRequest;
import com.tour.Integrated.Travel.Management.dto.Response.CabBookingResponse;
import com.tour.Integrated.Travel.Management.dto.Response.CabResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CabService {

    @Autowired
    private CabRepository cabRepository;

    @Autowired
    private CabBookingRepository cabBookingRepository;

    @Autowired
    private UserRepository userRepository;

    // Cab CRUD
    public CabResponse createCab(CabRequest request) {
        Cab cab = CabTransformer.cabRequestToCab(request);
        Cab savedCab = cabRepository.save(cab);
        return CabTransformer.cabToCabResponse(savedCab);
    }

    public List<CabResponse> getAllCabs() {
        return cabRepository.findAll().stream()
                .map(CabTransformer::cabToCabResponse)
                .collect(Collectors.toList());
    }

    public CabResponse getCabById(Long cabId) {
        Cab cab = cabRepository.findById(cabId)
                .orElseThrow(() -> new RuntimeException("Cab not found with id: " + cabId));
        return CabTransformer.cabToCabResponse(cab);
    }

    public List<CabResponse> getAvailableCabs() {
        return cabRepository.findByAvailableTrue().stream()
                .map(CabTransformer::cabToCabResponse)
                .collect(Collectors.toList());
    }

    public List<CabResponse> getCabsByType(VehicleType vehicleType) {
        return cabRepository.findByVehicleType(vehicleType).stream()
                .map(CabTransformer::cabToCabResponse)
                .collect(Collectors.toList());
    }

    public List<CabResponse> getAvailableCabsByType(VehicleType vehicleType) {
        return cabRepository.findByVehicleTypeAndAvailableTrue(vehicleType).stream()
                .map(CabTransformer::cabToCabResponse)
                .collect(Collectors.toList());
    }

    public CabResponse updateCab(Long cabId, CabRequest request) {
        Cab cab = cabRepository.findById(cabId)
                .orElseThrow(() -> new RuntimeException("Cab not found with id: " + cabId));

        cab.setVehicleNumber(request.getVehicleNumber());
        cab.setVehicleName(request.getVehicleName());
        cab.setVehicleType(request.getVehicleType());
        cab.setDriverName(request.getDriverName());
        cab.setDriverPhone(request.getDriverPhone());
        cab.setImageUrl(request.getImageUrl());
        cab.setSeatingCapacity(request.getSeatingCapacity());
        cab.setPricePerKm(request.getPricePerKm());
        cab.setBaseFare(request.getBaseFare());
        cab.setFeatures(request.getFeatures());

        Cab updatedCab = cabRepository.save(cab);
        return CabTransformer.cabToCabResponse(updatedCab);
    }

    public void deleteCab(Long cabId) {
        cabRepository.deleteById(cabId);
    }

    public void setCabAvailability(Long cabId, Boolean available) {
        Cab cab = cabRepository.findById(cabId)
                .orElseThrow(() -> new RuntimeException("Cab not found with id: " + cabId));
        cab.setAvailable(available);
        cabRepository.save(cab);
    }

    // Booking operations
    @Transactional
    public CabBookingResponse bookCab(Long userId, CabBookingRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Cab cab = cabRepository.findById(request.getCabId())
                .orElseThrow(() -> new RuntimeException("Cab not found with id: " + request.getCabId()));

        if (!cab.getAvailable()) {
            throw new RuntimeException("Cab is not available");
        }

        // Calculate estimated fare
        double distanceKm = request.getDistanceKm() != null ? request.getDistanceKm() : 10.0;
        double baseFare = cab.getBaseFare() != null ? cab.getBaseFare() : 50.0;
        double pricePerKm = cab.getPricePerKm() != null ? cab.getPricePerKm() : 15.0;
        double estimatedFare = baseFare + (distanceKm * pricePerKm);

        CabBooking booking = CabBooking.builder()
                .user(user)
                .cab(cab)
                .pickupLocation(request.getPickupLocation())
                .dropLocation(request.getDropLocation())
                .pickupDateTime(request.getPickupDateTime())
                .distanceKm(distanceKm)
                .estimatedFare(estimatedFare)
                .status(CabBookingStatus.PENDING)
                .passengerName(request.getPassengerName())
                .passengerPhone(request.getPassengerPhone())
                .specialRequests(request.getSpecialRequests())
                .build();

        CabBooking savedBooking = cabBookingRepository.save(booking);

        // Set cab as unavailable
        cab.setAvailable(false);
        cabRepository.save(cab);

        return CabBookingTransformer.bookingToBookingResponse(savedBooking);
    }

    public List<CabBookingResponse> getBookingsForUser(Long userId) {
        return cabBookingRepository.findByUserId(userId).stream()
                .map(CabBookingTransformer::bookingToBookingResponse)
                .collect(Collectors.toList());
    }

    public CabBookingResponse getBookingById(Long bookingId) {
        CabBooking booking = cabBookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));
        return CabBookingTransformer.bookingToBookingResponse(booking);
    }

    @Transactional
    public CabBookingResponse cancelBooking(Long bookingId) {
        CabBooking booking = cabBookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));

        booking.setStatus(CabBookingStatus.CANCELLED);

        // Make cab available again
        if (booking.getCab() != null) {
            booking.getCab().setAvailable(true);
            cabRepository.save(booking.getCab());
        }

        CabBooking updatedBooking = cabBookingRepository.save(booking);
        return CabBookingTransformer.bookingToBookingResponse(updatedBooking);
    }

    @Transactional
    public CabBookingResponse confirmBooking(Long bookingId) {
        CabBooking booking = cabBookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));

        booking.setStatus(CabBookingStatus.CONFIRMED);
        CabBooking updatedBooking = cabBookingRepository.save(booking);
        return CabBookingTransformer.bookingToBookingResponse(updatedBooking);
    }

    @Transactional
    public CabBookingResponse completeBooking(Long bookingId, Double finalFare) {
        CabBooking booking = cabBookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));

        booking.setStatus(CabBookingStatus.COMPLETED);
        booking.setFinalFare(finalFare != null ? finalFare : booking.getEstimatedFare());

        // Make cab available again
        if (booking.getCab() != null) {
            booking.getCab().setAvailable(true);
            cabRepository.save(booking.getCab());
        }

        CabBooking updatedBooking = cabBookingRepository.save(booking);
        return CabBookingTransformer.bookingToBookingResponse(updatedBooking);
    }
}
