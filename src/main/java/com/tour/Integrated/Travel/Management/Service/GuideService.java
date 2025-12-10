package com.tour.Integrated.Travel.Management.Service;
import com.tour.Integrated.Travel.Management.Model.Guide;
import com.tour.Integrated.Travel.Management.Model.User;
import com.tour.Integrated.Travel.Management.Repository.GuideRepository;
import com.tour.Integrated.Travel.Management.Repository.UserRepository;
import com.tour.Integrated.Travel.Management.Transformers.GuideTransformer;
import com.tour.Integrated.Travel.Management.dto.Request.GuideRequest;
import com.tour.Integrated.Travel.Management.dto.Response.GuideResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuideService {

    private final GuideRepository guideRepo;
    private final UserRepository userRepo;

    public GuideService(GuideRepository guideRepo, UserRepository userRepo) {
        this.guideRepo = guideRepo;
        this.userRepo = userRepo;
    }

    public GuideResponse createGuide(GuideRequest req) {
        User user = userRepo.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Guide guide = GuideTransformer.guideRequestToGuide(req, user);
        Guide saved = guideRepo.save(guide);

        return GuideTransformer.guideToGuideResponse(saved);
    }

    public List<GuideResponse> getAllGuides() {
        return guideRepo.findAll()
                .stream()
                .map(GuideTransformer::guideToGuideResponse)
                .toList();
    }

    public GuideResponse getGuide(Long id) {
        Guide g = guideRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Guide not found"));

        return GuideTransformer.guideToGuideResponse(g);
    }

    public void deleteGuide(Long id) {
        if (!guideRepo.existsById(id)) {
            throw new RuntimeException("Guide not found");
        }
        guideRepo.deleteById(id);
    }
}
