package com.tour.Integrated.Travel.Management.Transformers;

import com.tour.Integrated.Travel.Management.Model.Review;
import com.tour.Integrated.Travel.Management.Model.TourPackage;
import com.tour.Integrated.Travel.Management.Model.User;
import com.tour.Integrated.Travel.Management.dto.Request.ReviewRequest;
import com.tour.Integrated.Travel.Management.dto.Response.ReviewResponse;

public class ReviewTransformer {
    public static Review reviewRequestToReview(ReviewRequest req, User user, TourPackage tour){
           return Review.builder()
                   .rating(req.getRating())
                   .comment(req.getComment())
                   .user(user)
                   .tourPackage(tour)
                   .build();
    }
    public static ReviewResponse reviewToReviewResponse(Review r){
        return ReviewResponse.builder()
                .id(r.getId())
                .rating(r.getRating())
                .comment(r.getComment())
                .UserId(r.getUser().getId())
                .packageId(r.getTourPackage().getId())
                .build();
    }
}
