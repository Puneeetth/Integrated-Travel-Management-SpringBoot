package com.tour.Integrated.Travel.Management.Transformers;

import com.tour.Integrated.Travel.Management.Model.Guide;
import com.tour.Integrated.Travel.Management.Model.User;
import com.tour.Integrated.Travel.Management.dto.Request.GuideRequest;
import com.tour.Integrated.Travel.Management.dto.Response.GuideResponse;

public class GuideTransformer {
    public static Guide guideRequestToGuide(GuideRequest req, User user) {
        return Guide.builder()
                .languages(req.getLanguages())
                .rating(req.getRating())
                .user(user)
                .build();
    }

    public static GuideResponse guideToGuideResponse(Guide g) {
        return GuideResponse.builder()
                .id(g.getId())
                .languages(g.getLanguages())
                .rating(g.getRating())
                .userId(g.getUser().getId())
                .userName(g.getUser().getName())
                .userEmail(g.getUser().getEmail())
                .build();
    }
}
