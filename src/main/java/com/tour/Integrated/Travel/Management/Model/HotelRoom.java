package com.tour.Integrated.Travel.Management.Model;

import com.tour.Integrated.Travel.Management.Enum.RoomType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "hotel_rooms")
public class HotelRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private RoomType roomType;

    private String roomNumber;

    @Positive
    private Double pricePerNight;

    @Min(1)
    private Integer maxOccupancy;

    private Integer totalRooms;

    private Integer availableRooms;

    private String amenities; // Room-specific: "AC,TV,Minibar"

    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    @Builder.Default
    @OneToMany(mappedBy = "hotelRoom", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<HotelBooking> bookings = new ArrayList<>();
}
