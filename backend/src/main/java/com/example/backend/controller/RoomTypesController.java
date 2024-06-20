package com.example.backend.controller;

import com.example.backend.entity.RoomType;
import com.example.backend.service.RoomTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roomtypes")
@RequiredArgsConstructor
public class RoomTypesController {
    private final RoomTypeService service;

    @GetMapping
    public List<RoomType> getAllRoomTypes() {
        return service.getAllRoomTypes();
    }
}
