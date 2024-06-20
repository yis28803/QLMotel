package com.example.backend.controller;

import com.example.backend.entity.Service;
import com.example.backend.repository.RoomServiceRepository;
import com.example.backend.service.RoomServiceOfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api/v1/roomservice")
@RequiredArgsConstructor
public class RoomServiceController {
    private final RoomServiceOfService service;

//    @GetMapping("/{room_id}")
//    public ResponseEntity<List<Service>> getAllServiceByRoomId(
//            @PathVariable("room_id") Long roomId
//    ) {
//        List<Service> services = service.findAllByRoomId(roomId);
//        return ResponseEntity.ok(services);
//    }

    @GetMapping("/{booking_id}")
    public ResponseEntity<List<Service>> getAllServiceByBookingId(
            @PathVariable("booking_id") Long bookingId
    ) {
        List<Service> services = service.findAllByBookingId(bookingId);
        return ResponseEntity.ok(services);
    }
}
