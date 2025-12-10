package com.tour.Integrated.Travel.Management.Controller;

import com.tour.Integrated.Travel.Management.Service.BookingService;
import com.tour.Integrated.Travel.Management.dto.Request.BookingRequest;
import com.tour.Integrated.Travel.Management.dto.Response.BookingResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/{userId}")
    public BookingResponse createBooking(@PathVariable Long userId,
                                         @Valid @RequestBody BookingRequest req) {
        return bookingService.createBooking(userId, req);
    }

    @GetMapping("/{id}")
    public BookingResponse getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    @GetMapping("/user/{userId}")
    public List<BookingResponse> getBookingsForUser(@PathVariable Long userId) {
        return bookingService.getBookingsForUser(userId);
    }
}

