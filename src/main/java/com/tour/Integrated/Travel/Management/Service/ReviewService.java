package com.tour.Integrated.Travel.Management.Service;

import com.tour.Integrated.Travel.Management.Model.Review;
import com.tour.Integrated.Travel.Management.Model.TourPackage;
import com.tour.Integrated.Travel.Management.Model.User;
import com.tour.Integrated.Travel.Management.Repository.ReviewRepository;
import com.tour.Integrated.Travel.Management.Repository.TourPackageRepository;
import com.tour.Integrated.Travel.Management.Repository.UserRepository;
import com.tour.Integrated.Travel.Management.Transformers.ReviewTransformer;
import com.tour.Integrated.Travel.Management.dto.Request.ReviewRequest;
import com.tour.Integrated.Travel.Management.dto.Response.ReviewResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final TourPackageRepository tourPackageRepository;
    private final UserRepository userRepository;
    public ReviewService(TourPackageRepository tourPackageRepository, ReviewRepository reviewRepository,UserRepository userRepository){
        this.tourPackageRepository = tourPackageRepository;
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
    }
    public ReviewResponse createReview(Long userId, ReviewRequest req){
        User user = userRepository.findById(userId)
                .orElseThrow(() ->new RuntimeException("User Not Found"));
        TourPackage tour = tourPackageRepository.findById(req.getPackageId())
                .orElseThrow(() ->new RuntimeException("Package Not Found"));

        Review review = ReviewTransformer.reviewRequestToReview(req,user,tour);
        Review saved = reviewRepository.save(review);
        return ReviewTransformer.reviewToReviewResponse(saved);
    }
    public ReviewResponse getReviewById(Long id){
        Review review = reviewRepository.findById(id)
                .orElseThrow(() ->new RuntimeException("No Review Found"));
        return ReviewTransformer.reviewToReviewResponse(review);
    }
    public List<ReviewResponse> getReviewsForPackage(Long packageId){
        return reviewRepository.findByTourPackageId(packageId)
                .stream()
                .map(ReviewTransformer::reviewToReviewResponse)
                .toList();
    }
}
