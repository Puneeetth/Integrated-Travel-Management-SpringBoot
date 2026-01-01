package com.tour.Integrated.Travel.Management.Repository;

import com.tour.Integrated.Travel.Management.Enum.ActivityBookingStatus;
import com.tour.Integrated.Travel.Management.Model.ActivityBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityBookingRepository extends JpaRepository<ActivityBooking, Long> {

    List<ActivityBooking> findByUserId(Long userId);

    List<ActivityBooking> findByActivityId(Long activityId);

    List<ActivityBooking> findByStatus(ActivityBookingStatus status);

    List<ActivityBooking> findByUserIdAndStatus(Long userId, ActivityBookingStatus status);
}
