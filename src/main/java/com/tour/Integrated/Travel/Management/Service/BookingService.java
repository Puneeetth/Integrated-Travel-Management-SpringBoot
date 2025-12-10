package com.tour.Integrated.Travel.Management.Service;

import com.tour.Integrated.Travel.Management.Enum.BookingStatus;
import com.tour.Integrated.Travel.Management.Model.Booking;
import com.tour.Integrated.Travel.Management.Model.TourPackage;
import com.tour.Integrated.Travel.Management.Model.User;
import com.tour.Integrated.Travel.Management.Repository.BookingRepository;
import com.tour.Integrated.Travel.Management.Repository.TourPackageRepository;
import com.tour.Integrated.Travel.Management.Repository.UserRepository;
import com.tour.Integrated.Travel.Management.Transformers.BookingTransformer;
import com.tour.Integrated.Travel.Management.dto.Request.BookingRequest;
import com.tour.Integrated.Travel.Management.dto.Response.BookingResponse;
import jakarta.transaction.Transactional;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
         public final TourPackageRepository tourPackageRepository;
         public final BookingRepository bookingRepository;
         public final UserRepository userRepository;

         public BookingService(TourPackageRepository tourPackageRepository,BookingRepository bookingRepository,UserRepository userRepository){
             this.tourPackageRepository = tourPackageRepository;
             this.bookingRepository = bookingRepository;
             this.userRepository = userRepository;

         }
         @Transactional
         public BookingResponse createBooking(Long userId, BookingRequest req){
             int attempts = 0;
             int seats = req.getSeats();
             Long packageId = req.getPackageId();

             while(attempts < 3){
                 attempts++;
                 try{
                     TourPackage tour = tourPackageRepository.findById(packageId)
                             .orElseThrow(() ->new IllegalStateException("No Package Found"));
                     if(tour.getAvailableSeats() < seats){
                         throw new IllegalStateException("Not enough seats Available");
                     }
                     int updated = tourPackageRepository.decrementAvailableSeatsIfEnough(packageId,seats);

                     if(updated == 0) throw new IllegalStateException("Concurrent update");

                     User user = userRepository.findById(userId)
                             .orElseThrow(() ->new IllegalStateException("User Not Found"));
                     Booking booking = Booking.builder()
                             .user(user)
                             .tourPackage(tour)
                             .seatsBooked(seats)
                             .status(BookingStatus.PENDING)
                             .build();

                     Booking saved = bookingRepository.save(booking);
                     return BookingTransformer.bookingToBookingResponse(saved);
                 }catch (OptimisticLockingFailureException e){

                     if(attempts >= 3){
                         Booking failed = Booking.builder()
                                 .user(null)
                                 .tourPackage(null)
                                 .seatsBooked(seats)
                                 .status(BookingStatus.FAILED)
                                 .build();

                         Booking saved = bookingRepository.save(failed);
                         return BookingTransformer.bookingToBookingResponse(saved);
                     }
                     try{
                         Thread.sleep(50L);

                     }catch (InterruptedException ignored){}
                 }
             }
             Booking failed = Booking.builder()
                     .user(null)
                     .tourPackage(null)
                     .seatsBooked(seats)
                     .status(BookingStatus.FAILED)
                     .build();

             Booking saved = bookingRepository.save(failed);
             return BookingTransformer.bookingToBookingResponse(saved);
         }
        public BookingResponse getBookingById(Long id){
             Booking b = bookingRepository.findById(id)
                     .orElseThrow(() -> new RuntimeException("Booking Not Found"));
             return BookingTransformer.bookingToBookingResponse(b);
        }
        public List<BookingResponse> getBookingsForUser(Long userId){
             return bookingRepository.findAll()
                     .stream()
                     .map(BookingTransformer::bookingToBookingResponse)
                     .toList();
        }
}
