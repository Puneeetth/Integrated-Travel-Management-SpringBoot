package com.tour.Integrated.Travel.Management.Repository;

import com.tour.Integrated.Travel.Management.Model.TourPackage;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TourPackageRepository extends JpaRepository<TourPackage,Long> {

    @Transactional
    @Modifying
    @Query("""
    update TourPackage t 
    set t.availableSeats = t.availableSeats - :seats 
    where t.id = :id and t.availableSeats >= :seats
""")
    int decrementAvailableSeatsIfEnough(@Param("id") Long id, @Param("seats") int seats);


}
