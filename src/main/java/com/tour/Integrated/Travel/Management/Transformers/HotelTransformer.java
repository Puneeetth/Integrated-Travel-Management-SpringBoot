package com.tour.Integrated.Travel.Management.Transformers;

import com.tour.Integrated.Travel.Management.Model.Hotel;
import com.tour.Integrated.Travel.Management.dto.Request.HotelRequest;
import com.tour.Integrated.Travel.Management.dto.Response.HotelResponse;

import java.util.Collections;
import java.util.stream.Collectors;

public class HotelTransformer {

    public static Hotel hotelRequestToHotel(HotelRequest request) {
        return Hotel.builder()
                .name(request.getName())
                .city(request.getCity())
                .address(request.getAddress())
                .description(request.getDescription())
                .starRating(request.getStarRating())
                .imageUrl(request.getImageUrl())
                .amenities(request.getAmenities())
                .contactPhone(request.getContactPhone())
                .contactEmail(request.getContactEmail())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .userRating(0.0)
                .build();
    }

    public static HotelResponse hotelToHotelResponse(Hotel hotel) {
        Double lowestPrice = hotel.getRooms() != null && !hotel.getRooms().isEmpty()
                ? hotel.getRooms().stream()
                        .mapToDouble(r -> r.getPricePerNight() != null ? r.getPricePerNight() : Double.MAX_VALUE)
                        .min()
                        .orElse(0.0)
                : null;

        return HotelResponse.builder()
                .id(hotel.getId())
                .name(hotel.getName())
                .city(hotel.getCity())
                .address(hotel.getAddress())
                .description(hotel.getDescription())
                .starRating(hotel.getStarRating())
                .userRating(hotel.getUserRating())
                .imageUrl(hotel.getImageUrl())
                .amenities(hotel.getAmenities())
                .contactPhone(hotel.getContactPhone())
                .contactEmail(hotel.getContactEmail())
                .latitude(hotel.getLatitude())
                .longitude(hotel.getLongitude())
                .lowestPrice(lowestPrice)
                .rooms(hotel.getRooms() != null ? hotel.getRooms().stream()
                        .map(HotelRoomTransformer::roomToRoomResponse)
                        .collect(Collectors.toList())
                        : Collections.emptyList())
                .build();
    }

    public static HotelResponse hotelToHotelResponseWithoutRooms(Hotel hotel) {
        Double lowestPrice = hotel.getRooms() != null && !hotel.getRooms().isEmpty()
                ? hotel.getRooms().stream()
                        .mapToDouble(r -> r.getPricePerNight() != null ? r.getPricePerNight() : Double.MAX_VALUE)
                        .min()
                        .orElse(0.0)
                : null;

        return HotelResponse.builder()
                .id(hotel.getId())
                .name(hotel.getName())
                .city(hotel.getCity())
                .address(hotel.getAddress())
                .description(hotel.getDescription())
                .starRating(hotel.getStarRating())
                .userRating(hotel.getUserRating())
                .imageUrl(hotel.getImageUrl())
                .amenities(hotel.getAmenities())
                .contactPhone(hotel.getContactPhone())
                .contactEmail(hotel.getContactEmail())
                .latitude(hotel.getLatitude())
                .longitude(hotel.getLongitude())
                .lowestPrice(lowestPrice)
                .rooms(Collections.emptyList())
                .build();
    }
}
