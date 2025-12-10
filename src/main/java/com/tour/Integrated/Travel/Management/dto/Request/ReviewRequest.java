package com.tour.Integrated.Travel.Management.dto.Request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReviewRequest {
    private Long packageId;
    @Min(1)
    @Max(5)
    private Integer rating;
    @Size(max=1000)
    private String comment;

}
