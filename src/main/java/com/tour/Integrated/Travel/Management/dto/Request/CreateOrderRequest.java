package com.tour.Integrated.Travel.Management.dto.Request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOrderRequest {
    private List<Long> hotelBookingIds;
    private List<Long> cabBookingIds;
    private List<Long> activityBookingIds;
}
