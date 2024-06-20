package com.example.backend.repository;

import com.example.backend.entity.RoomService;
import com.example.backend.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomServiceRepository extends JpaRepository<RoomService, Long> {

    @Query("SELECT rs.service FROM RoomService rs WHERE rs.room.roomId = ?1")
    List<Service> findAllByRoomId(Long roomId);

}
