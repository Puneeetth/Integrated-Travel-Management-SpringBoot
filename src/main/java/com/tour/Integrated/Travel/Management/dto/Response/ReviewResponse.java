package com.tour.Integrated.Travel.Management.dto.Response;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewResponse {
    private Long id;
    private Integer rating;
    private String comment;
    private Long UserId;
    private Long packageId;
}
