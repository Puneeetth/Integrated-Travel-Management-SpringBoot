package com.tour.Integrated.Travel.Management.dto.Request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PackageRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    @Min(1)
    private Integer availableSeats;

    @NotNull
    @Min(0)
    private Double price;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;
}
