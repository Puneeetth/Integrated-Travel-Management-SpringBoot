package com.tour.Integrated.Travel.Management.dto.Response;

import lombok.Builder;
import lombok.Value;

import java.time.LocalDate;
@Value
@Builder
public class PackageResponse {
        Long id;
        String title;
        String description;
        Integer availableSeats;
        Double price;
        LocalDate startDate;
        LocalDate endDate;
    }

