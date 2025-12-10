package com.tour.Integrated.Travel.Management.Transformers;

import com.tour.Integrated.Travel.Management.Enum.BookingStatus;
import com.tour.Integrated.Travel.Management.Model.Booking;
import com.tour.Integrated.Travel.Management.Model.TourPackage;
import com.tour.Integrated.Travel.Management.Model.User;
import com.tour.Integrated.Travel.Management.dto.Request.BookingRequest;
import com.tour.Integrated.Travel.Management.dto.Response.BookingResponse;

public class BookingTransformer {
      public static Booking BookingRequestToBooking(BookingRequest req, User user, TourPackage tourPackage){
          return Booking.builder()
                  .seatsBooked(req.getSeats())
                  .status(BookingStatus.PENDING)
                  .user(user)
                  .tourPackage(tourPackage)
                  .build();
      }
      public static BookingResponse bookingToBookingResponse(Booking b){
          return BookingResponse.builder()
                  .bookingId(b.getId())
                  .status(b.getStatus().name())
                  .seatsBooked(b.getSeatsBooked())
                  .tourPackageId(b.getTourPackage().getId())
                  .userId(b.getUser().getId())
                  .build();
      }
}
