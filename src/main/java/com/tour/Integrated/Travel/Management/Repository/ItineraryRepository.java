package com.tour.Integrated.Travel.Management.Repository;

import com.tour.Integrated.Travel.Management.Model.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {
    List<Itinerary> findByTourPackageIdOrderByDayNumberAsc(Long packageId);
}
