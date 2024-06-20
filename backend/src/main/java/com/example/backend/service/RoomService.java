package com.example.backend.service;

import com.example.backend.entity.Room;
import com.example.backend.entity.RoomType;
import com.example.backend.repository.RoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomTypeService roomTypeService;


    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room addRoom(Room room) {
        // Lấy ra roomType từ room
        RoomType roomType = room.getRoomType();
        // Lấy ra roomTypeId từ roomType
        Long roomTypeId = roomType.getRoomTypeId();
        // Lấy ra roomType từ roomTypeId
        roomType = roomTypeService.getRoomTypeById(roomTypeId);
        // Set lại roomType cho room
        room.setRoomType(roomType);
        // Lưu room
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, Room room) {
        // Lấy ra roomType từ room
        RoomType roomType = room.getRoomType();
        // Lấy ra roomTypeId từ roomType
        Long roomTypeId = roomType.getRoomTypeId();
        // Lấy ra roomType từ roomTypeId
        roomType = roomTypeService.getRoomTypeById(roomTypeId);
        // Set lại roomType cho room
        room.setRoomType(roomType);
        // Set lại roomId cho room
        room.setRoomId(id);
        // Lưu room
        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    public Room getRoomById(Long id) {
        return roomRepository.findById(id).orElseThrow();
    }
}
