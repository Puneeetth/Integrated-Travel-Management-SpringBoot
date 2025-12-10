package com.tour.Integrated.Travel.Management.Repository;

import com.tour.Integrated.Travel.Management.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    List<Review> findByTourPackageId(Long packageId);
    List<Review> findByUserId(Long userId);
}
