package com.tour.Integrated.Travel.Management.Controller;

import com.tour.Integrated.Travel.Management.Service.GuideService;
import com.tour.Integrated.Travel.Management.dto.Request.GuideRequest;
import com.tour.Integrated.Travel.Management.dto.Response.GuideResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/guides")
public class GuideController {

    private final GuideService guideService;

    public GuideController(GuideService guideService) {
        this.guideService = guideService;
    }

    @PostMapping("/{userId}")
    public GuideResponse createGuide(@Valid @RequestBody GuideRequest req) {
        return guideService.createGuide(req);
    }

    @GetMapping("/{id}")
    public GuideResponse getGuide(@PathVariable Long id) {
        return guideService.getGuide(id);
    }
}