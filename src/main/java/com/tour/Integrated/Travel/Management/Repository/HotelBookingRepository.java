package com.tour.Integrated.Travel.Management.Repository;

import com.tour.Integrated.Travel.Management.Enum.HotelBookingStatus;
import com.tour.Integrated.Travel.Management.Model.HotelBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HotelBookingRepository extends JpaRepository<HotelBooking, Long> {

    List<HotelBooking> findByUserId(Long userId);

    List<HotelBooking> findByHotelId(Long hotelId);

    List<HotelBooking> findByStatus(HotelBookingStatus status);

    List<HotelBooking> findByUserIdAndStatus(Long userId, HotelBookingStatus status);

    List<HotelBooking> findByHotelRoomIdAndCheckOutDateAfterAndCheckInDateBefore(
            Long roomId, LocalDate checkIn, LocalDate checkOut);
}
