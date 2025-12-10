package com.tour.Integrated.Travel.Management.dto.Request;

import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BookingRequest {
    private Long packageId;
    @Min(1)
    private Integer seats;

}
