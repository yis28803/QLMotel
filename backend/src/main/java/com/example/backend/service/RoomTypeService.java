package com.example.backend.service;

import com.example.backend.entity.RoomType;
import com.example.backend.repository.RoomTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RoomTypeService {

    private final RoomTypeRepository repository;

    public List<RoomType> getAllRoomTypes() {
        return repository.findAll();
    }


    public RoomType getRoomTypeById(Long roomTypeId) {
        return repository.findById(roomTypeId).orElseThrow();
    }
}
