package com.example.backend.repository;

import com.example.backend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query(value = "SELECT room_id FROM Booking WHERE booking_id = ?1", nativeQuery = true)
    Long findRoomIdByBookingId(Long bookingId);
}
