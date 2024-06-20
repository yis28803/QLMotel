package com.example.backend.controller;

import com.example.backend.entity.Room;
import com.example.backend.entity.RoomType;
import com.example.backend.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@RequiredArgsConstructor
public class RoomController {
        private final RoomService roomService;

        @GetMapping
        public List<Room> getAllRooms() {
                return roomService.getAllRooms();
        }

        @GetMapping("{id}")
        public Room getRoomById(
                @PathVariable("id") Long id
        ) {
                return roomService.getRoomById(id);
        }
        @PostMapping("/add")
        public Room addRoom(
                @RequestBody Room room
        ) {
                System.out.println("tes:t: " + room);
                return roomService.addRoom(room);
        }

        @PutMapping("/{id}")
        public Room updateRoom(
                @PathVariable("id") Long id,
                @RequestBody Room room
        ) {
                return roomService.updateRoom(id, room);
        }

        @DeleteMapping("/{id}")
        public void deleteRoom(
                @PathVariable("id") Long id
        ) {
                roomService.deleteRoom(id);
        }
}
