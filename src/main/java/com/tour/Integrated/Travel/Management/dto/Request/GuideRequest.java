package com.tour.Integrated.Travel.Management.dto.Request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GuideRequest {

    @NotNull
    private Long userId;   // Admin chooses which user becomes a guide

    @NotBlank
    private String languages;

    @Min(0)
    private Double rating;
}