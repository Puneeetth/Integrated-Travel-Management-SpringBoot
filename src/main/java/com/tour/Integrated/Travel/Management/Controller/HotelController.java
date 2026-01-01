package com.tour.Integrated.Travel.Management.Controller;

import com.tour.Integrated.Travel.Management.Service.HotelService;
import com.tour.Integrated.Travel.Management.dto.Request.HotelBookingRequest;
import com.tour.Integrated.Travel.Management.dto.Request.HotelRequest;
import com.tour.Integrated.Travel.Management.dto.Request.HotelRoomRequest;
import com.tour.Integrated.Travel.Management.dto.Response.HotelBookingResponse;
import com.tour.Integrated.Travel.Management.dto.Response.HotelResponse;
import com.tour.Integrated.Travel.Management.dto.Response.HotelRoomResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "*")
public class HotelController {

    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    // Hotel endpoints
    @PostMapping
    public ResponseEntity<HotelResponse> createHotel(@Valid @RequestBody HotelRequest request) {
        HotelResponse response = hotelService.createHotel(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<HotelResponse>> getAllHotels() {
        List<HotelResponse> hotels = hotelService.getAllHotels();
        return ResponseEntity.ok(hotels);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HotelResponse> getHotelById(@PathVariable Long id) {
        HotelResponse response = hotelService.getHotelById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<HotelResponse>> searchHotels(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Integer starRating) {
        List<HotelResponse> hotels = hotelService.searchHotels(city, starRating);
        return ResponseEntity.ok(hotels);
    }

    @GetMapping("/search/keyword")
    public ResponseEntity<List<HotelResponse>> searchByKeyword(@RequestParam String keyword) {
        List<HotelResponse> hotels = hotelService.searchByKeyword(keyword);
        return ResponseEntity.ok(hotels);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HotelResponse> updateHotel(
            @PathVariable Long id,
            @Valid @RequestBody HotelRequest request) {
        HotelResponse response = hotelService.updateHotel(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        hotelService.deleteHotel(id);
        return ResponseEntity.noContent().build();
    }

    // Room endpoints
    @PostMapping("/rooms")
    public ResponseEntity<HotelRoomResponse> createRoom(@Valid @RequestBody HotelRoomRequest request) {
        HotelRoomResponse response = hotelService.createRoom(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{hotelId}/rooms")
    public ResponseEntity<List<HotelRoomResponse>> getRoomsByHotel(@PathVariable Long hotelId) {
        List<HotelRoomResponse> rooms = hotelService.getRoomsByHotel(hotelId);
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/{hotelId}/rooms/available")
    public ResponseEntity<List<HotelRoomResponse>> getAvailableRooms(@PathVariable Long hotelId) {
        List<HotelRoomResponse> rooms = hotelService.getAvailableRooms(hotelId);
        return ResponseEntity.ok(rooms);
    }

    // Booking endpoints
    @PostMapping("/bookings/{userId}")
    public ResponseEntity<HotelBookingResponse> createBooking(
            @PathVariable Long userId,
            @Valid @RequestBody HotelBookingRequest request) {
        HotelBookingResponse response = hotelService.createBooking(userId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/bookings/user/{userId}")
    public ResponseEntity<List<HotelBookingResponse>> getBookingsForUser(@PathVariable Long userId) {
        List<HotelBookingResponse> bookings = hotelService.getBookingsForUser(userId);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/bookings/{bookingId}")
    public ResponseEntity<HotelBookingResponse> getBookingById(@PathVariable Long bookingId) {
        HotelBookingResponse response = hotelService.getBookingById(bookingId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/bookings/{bookingId}/cancel")
    public ResponseEntity<HotelBookingResponse> cancelBooking(@PathVariable Long bookingId) {
        HotelBookingResponse response = hotelService.cancelBooking(bookingId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/bookings/{bookingId}/confirm")
    public ResponseEntity<HotelBookingResponse> confirmBooking(@PathVariable Long bookingId) {
        HotelBookingResponse response = hotelService.confirmBooking(bookingId);
        return ResponseEntity.ok(response);
    }
}
