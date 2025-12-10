package com.tour.Integrated.Travel.Management.Controller;

import com.tour.Integrated.Travel.Management.Service.ReviewService;
import com.tour.Integrated.Travel.Management.dto.Request.ReviewRequest;
import com.tour.Integrated.Travel.Management.dto.Response.ReviewResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // For now userId is passed manually
    @PostMapping("/{userId}")
    public ReviewResponse createReview(@PathVariable Long userId,
                                       @Valid @RequestBody ReviewRequest req) {
        return reviewService.createReview(userId, req);
    }

    @GetMapping("/package/{packageId}")
    public List<ReviewResponse> getReviewsByPackage(@PathVariable Long packageId) {
        return reviewService.getReviewsForPackage(packageId);
    }
}
