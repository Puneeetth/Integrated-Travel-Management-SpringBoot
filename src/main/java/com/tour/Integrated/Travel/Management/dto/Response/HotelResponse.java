package com.tour.Integrated.Travel.Management.dto.Response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelResponse {
    private Long id;
    private String name;
    private String city;
    private String address;
    private String description;
    private Integer starRating;
    private Double userRating;
    private String imageUrl;
    private String amenities;
    private String contactPhone;
    private String contactEmail;
    private Double latitude;
    private Double longitude;
    private Double lowestPrice;
    private List<HotelRoomResponse> rooms;
}
