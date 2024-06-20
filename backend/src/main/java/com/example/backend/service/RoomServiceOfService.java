package com.example.backend.service;

import com.example.backend.entity.Booking;
import com.example.backend.entity.Room;
import com.example.backend.repository.BookingRepository;
import com.example.backend.repository.RoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RoomServiceOfService {
    private final com.example.backend.repository.RoomServiceRepository roomServiceRepository;
    private final BookingRepository bookingRepository;

    public java.util.List<com.example.backend.entity.Service> findAllByRoomId(Long roomId) {
        return roomServiceRepository.findAllByRoomId(roomId);
    }

    public List<com.example.backend.entity.Service> findAllByBookingId(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        Room room = booking.getRoom();
        Long roomId = room.getRoomId();
        return roomServiceRepository.findAllByRoomId(roomId);
    }
}
