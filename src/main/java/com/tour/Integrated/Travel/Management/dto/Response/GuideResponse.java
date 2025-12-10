package com.tour.Integrated.Travel.Management.dto.Response;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class GuideResponse {
    Long id;
    String languages;
    Double rating;
    Long userId;
    String userName;
    String userEmail;
}