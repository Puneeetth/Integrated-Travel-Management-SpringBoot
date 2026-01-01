package com.tour.Integrated.Travel.Management.Repository;

import com.tour.Integrated.Travel.Management.Model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {

    List<Hotel> findByCityContainingIgnoreCase(String city);

    List<Hotel> findByStarRatingGreaterThanEqual(Integer starRating);

    @Query("SELECT h FROM Hotel h WHERE " +
            "(:city IS NULL OR LOWER(h.city) LIKE LOWER(CONCAT('%', :city, '%'))) AND " +
            "(:starRating IS NULL OR h.starRating >= :starRating)")
    List<Hotel> searchHotels(@Param("city") String city,
            @Param("starRating") Integer starRating);

    @Query("SELECT h FROM Hotel h WHERE " +
            "LOWER(h.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(h.city) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Hotel> searchByKeyword(@Param("keyword") String keyword);
}
