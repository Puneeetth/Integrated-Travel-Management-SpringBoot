package com.tour.Integrated.Travel.Management.Repository;

import com.tour.Integrated.Travel.Management.Enum.DestinationCategory;
import com.tour.Integrated.Travel.Management.Model.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {

    List<Destination> findByCategory(DestinationCategory category);

    List<Destination> findByCityContainingIgnoreCase(String city);

    List<Destination> findByStateContainingIgnoreCase(String state);

    List<Destination> findByCountryContainingIgnoreCase(String country);

    @Query("SELECT d FROM Destination d WHERE " +
            "(:city IS NULL OR LOWER(d.city) LIKE LOWER(CONCAT('%', :city, '%'))) AND " +
            "(:category IS NULL OR d.category = :category)")
    List<Destination> searchDestinations(@Param("city") String city,
            @Param("category") DestinationCategory category);

    @Query("SELECT d FROM Destination d WHERE " +
            "LOWER(d.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.city) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.state) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Destination> searchByKeyword(@Param("keyword") String keyword);
}
