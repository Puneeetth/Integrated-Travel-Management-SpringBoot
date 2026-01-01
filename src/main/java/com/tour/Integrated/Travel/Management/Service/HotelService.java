package com.tour.Integrated.Travel.Management.Service;

import com.tour.Integrated.Travel.Management.Enum.HotelBookingStatus;
import com.tour.Integrated.Travel.Management.Model.Hotel;
import com.tour.Integrated.Travel.Management.Model.HotelBooking;
import com.tour.Integrated.Travel.Management.Model.HotelRoom;
import com.tour.Integrated.Travel.Management.Model.User;
import com.tour.Integrated.Travel.Management.Repository.HotelBookingRepository;
import com.tour.Integrated.Travel.Management.Repository.HotelRepository;
import com.tour.Integrated.Travel.Management.Repository.HotelRoomRepository;
import com.tour.Integrated.Travel.Management.Repository.UserRepository;
import com.tour.Integrated.Travel.Management.Transformers.HotelBookingTransformer;
import com.tour.Integrated.Travel.Management.Transformers.HotelRoomTransformer;
import com.tour.Integrated.Travel.Management.Transformers.HotelTransformer;
import com.tour.Integrated.Travel.Management.dto.Request.HotelBookingRequest;
import com.tour.Integrated.Travel.Management.dto.Request.HotelRequest;
import com.tour.Integrated.Travel.Management.dto.Request.HotelRoomRequest;
import com.tour.Integrated.Travel.Management.dto.Response.HotelBookingResponse;
import com.tour.Integrated.Travel.Management.dto.Response.HotelResponse;
import com.tour.Integrated.Travel.Management.dto.Response.HotelRoomResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;
    private final HotelRoomRepository hotelRoomRepository;
    private final HotelBookingRepository hotelBookingRepository;
    private final UserRepository userRepository;

    public HotelService(HotelRepository hotelRepository,
            HotelRoomRepository hotelRoomRepository,
            HotelBookingRepository hotelBookingRepository,
            UserRepository userRepository) {
        this.hotelRepository = hotelRepository;
        this.hotelRoomRepository = hotelRoomRepository;
        this.hotelBookingRepository = hotelBookingRepository;
        this.userRepository = userRepository;
    }

    // Hotel CRUD
    public HotelResponse createHotel(HotelRequest request) {
        Hotel hotel = HotelTransformer.hotelRequestToHotel(request);
        Hotel saved = hotelRepository.save(hotel);
        return HotelTransformer.hotelToHotelResponseWithoutRooms(saved);
    }

    public List<HotelResponse> getAllHotels() {
        return hotelRepository.findAll()
                .stream()
                .map(HotelTransformer::hotelToHotelResponseWithoutRooms)
                .collect(Collectors.toList());
    }

    public HotelResponse getHotelById(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + id));
        return HotelTransformer.hotelToHotelResponse(hotel);
    }

    public List<HotelResponse> searchHotels(String city, Integer starRating) {
        return hotelRepository.searchHotels(city, starRating)
                .stream()
                .map(HotelTransformer::hotelToHotelResponseWithoutRooms)
                .collect(Collectors.toList());
    }

    public List<HotelResponse> searchByKeyword(String keyword) {
        return hotelRepository.searchByKeyword(keyword)
                .stream()
                .map(HotelTransformer::hotelToHotelResponseWithoutRooms)
                .collect(Collectors.toList());
    }

    public HotelResponse updateHotel(Long id, HotelRequest request) {
        Hotel existing = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + id));

        existing.setName(request.getName());
        existing.setCity(request.getCity());
        existing.setAddress(request.getAddress());
        existing.setDescription(request.getDescription());
        existing.setStarRating(request.getStarRating());
        existing.setImageUrl(request.getImageUrl());
        existing.setAmenities(request.getAmenities());
        existing.setContactPhone(request.getContactPhone());
        existing.setContactEmail(request.getContactEmail());
        existing.setLatitude(request.getLatitude());
        existing.setLongitude(request.getLongitude());

        Hotel saved = hotelRepository.save(existing);
        return HotelTransformer.hotelToHotelResponseWithoutRooms(saved);
    }

    public void deleteHotel(Long id) {
        if (!hotelRepository.existsById(id)) {
            throw new RuntimeException("Hotel not found with id: " + id);
        }
        hotelRepository.deleteById(id);
    }

    // Room management
    public HotelRoomResponse createRoom(HotelRoomRequest request) {
        Hotel hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + request.getHotelId()));

        HotelRoom room = HotelRoomTransformer.roomRequestToRoom(request, hotel);
        HotelRoom saved = hotelRoomRepository.save(room);
        return HotelRoomTransformer.roomToRoomResponse(saved);
    }

    public List<HotelRoomResponse> getRoomsByHotel(Long hotelId) {
        return hotelRoomRepository.findByHotelId(hotelId)
                .stream()
                .map(HotelRoomTransformer::roomToRoomResponse)
                .collect(Collectors.toList());
    }

    public List<HotelRoomResponse> getAvailableRooms(Long hotelId) {
        return hotelRoomRepository.findByHotelIdAndAvailableRoomsGreaterThan(hotelId, 0)
                .stream()
                .map(HotelRoomTransformer::roomToRoomResponse)
                .collect(Collectors.toList());
    }

    // Booking operations
    @Transactional
    public HotelBookingResponse createBooking(Long userId, HotelBookingRequest request) {
        Hotel hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        HotelRoom room = hotelRoomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (room.getAvailableRooms() < request.getNumberOfRooms()) {
            throw new RuntimeException("Not enough rooms available. Available: " + room.getAvailableRooms());
        }

        // Decrement available rooms
        int updated = hotelRoomRepository.decrementAvailableRoomsIfEnough(
                request.getRoomId(), request.getNumberOfRooms());

        if (updated == 0) {
            throw new RuntimeException("Could not book room - rooms may have been taken");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Calculate total price
        long nights = ChronoUnit.DAYS.between(request.getCheckInDate(), request.getCheckOutDate());
        Double totalPrice = room.getPricePerNight() * nights * request.getNumberOfRooms();

        HotelBooking booking = HotelBooking.builder()
                .user(user)
                .hotel(hotel)
                .hotelRoom(room)
                .checkInDate(request.getCheckInDate())
                .checkOutDate(request.getCheckOutDate())
                .numberOfGuests(request.getNumberOfGuests())
                .numberOfRooms(request.getNumberOfRooms())
                .totalPrice(totalPrice)
                .status(HotelBookingStatus.PENDING)
                .specialRequests(request.getSpecialRequests())
                .build();

        HotelBooking saved = hotelBookingRepository.save(booking);
        return HotelBookingTransformer.bookingToBookingResponse(saved);
    }

    public List<HotelBookingResponse> getBookingsForUser(Long userId) {
        return hotelBookingRepository.findByUserId(userId)
                .stream()
                .map(HotelBookingTransformer::bookingToBookingResponse)
                .collect(Collectors.toList());
    }

    public HotelBookingResponse getBookingById(Long bookingId) {
        HotelBooking booking = hotelBookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return HotelBookingTransformer.bookingToBookingResponse(booking);
    }

    @Transactional
    public HotelBookingResponse cancelBooking(Long bookingId) {
        HotelBooking booking = hotelBookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() == HotelBookingStatus.CANCELLED) {
            throw new RuntimeException("Booking is already cancelled");
        }

        // Restore available rooms
        hotelRoomRepository.incrementAvailableRooms(
                booking.getHotelRoom().getId(), booking.getNumberOfRooms());

        booking.setStatus(HotelBookingStatus.CANCELLED);
        HotelBooking saved = hotelBookingRepository.save(booking);
        return HotelBookingTransformer.bookingToBookingResponse(saved);
    }

    @Transactional
    public HotelBookingResponse confirmBooking(Long bookingId) {
        HotelBooking booking = hotelBookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(HotelBookingStatus.CONFIRMED);
        HotelBooking saved = hotelBookingRepository.save(booking);
        return HotelBookingTransformer.bookingToBookingResponse(saved);
    }
}
