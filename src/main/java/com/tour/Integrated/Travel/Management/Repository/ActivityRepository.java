package com.tour.Integrated.Travel.Management.Repository;

import com.tour.Integrated.Travel.Management.Model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByDestinationId(Long destinationId);

    List<Activity> findByAvailableSlotsGreaterThan(Integer minSlots);

    @Modifying
    @Query("UPDATE Activity a SET a.availableSlots = a.availableSlots - :slots WHERE a.id = :activityId AND a.availableSlots >= :slots")
    int decrementAvailableSlotsIfEnough(@Param("activityId") Long activityId, @Param("slots") Integer slots);

    @Modifying
    @Query("UPDATE Activity a SET a.availableSlots = a.availableSlots + :slots WHERE a.id = :activityId")
    int incrementAvailableSlots(@Param("activityId") Long activityId, @Param("slots") Integer slots);
}
