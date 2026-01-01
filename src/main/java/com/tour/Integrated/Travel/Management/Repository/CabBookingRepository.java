package com.tour.Integrated.Travel.Management.Repository;

import com.tour.Integrated.Travel.Management.Enum.CabBookingStatus;
import com.tour.Integrated.Travel.Management.Model.CabBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CabBookingRepository extends JpaRepository<CabBooking, Long> {

    List<CabBooking> findByUserId(Long userId);

    List<CabBooking> findByCabId(Long cabId);

    List<CabBooking> findByStatus(CabBookingStatus status);

    List<CabBooking> findByUserIdAndStatus(Long userId, CabBookingStatus status);
}
