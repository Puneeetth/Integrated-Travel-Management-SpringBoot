package com.tour.Integrated.Travel.Management.Repository;

import com.tour.Integrated.Travel.Management.Enum.RoomType;
import com.tour.Integrated.Travel.Management.Model.HotelRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRoomRepository extends JpaRepository<HotelRoom, Long> {

    List<HotelRoom> findByHotelId(Long hotelId);

    List<HotelRoom> findByHotelIdAndRoomType(Long hotelId, RoomType roomType);

    List<HotelRoom> findByHotelIdAndAvailableRoomsGreaterThan(Long hotelId, Integer minRooms);

    @Modifying
    @Query("UPDATE HotelRoom r SET r.availableRooms = r.availableRooms - :rooms WHERE r.id = :roomId AND r.availableRooms >= :rooms")
    int decrementAvailableRoomsIfEnough(@Param("roomId") Long roomId, @Param("rooms") Integer rooms);

    @Modifying
    @Query("UPDATE HotelRoom r SET r.availableRooms = r.availableRooms + :rooms WHERE r.id = :roomId")
    int incrementAvailableRooms(@Param("roomId") Long roomId, @Param("rooms") Integer rooms);
}
