package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@Data
@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    private String roomName;

    @ManyToOne
    @JoinColumn(name = "room_type_id")
    private RoomType roomType;

    private String status;
    private String roomImageId;
    private String cleaningStatus;

    @ElementCollection
    private List<String> features;


    public Room() {
    }

    public Room(String roomName, String status, String roomImageId, String cleaningStatus, List<String> features) {
        this.roomName = roomName;
        this.status = status;
        this.roomImageId = roomImageId;
        this.cleaningStatus = cleaningStatus;
        this.features = features;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Room room)) return false;
        return Objects.equals(getRoomId(), room.getRoomId()) && Objects.equals(roomName, room.roomName) && Objects.equals(roomType, room.roomType) && Objects.equals(status, room.status) && Objects.equals(roomImageId, room.roomImageId) && Objects.equals(cleaningStatus, room.cleaningStatus) && Objects.equals(features, room.features);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRoomId(), roomName, roomType, status, roomImageId, cleaningStatus, features);
    }

    @Override
    public String toString() {
        return "Room{" +
                ", roomName='" + roomName + '\'' +
                ", roomType=" + roomType +
                ", status='" + status + '\'' +
                ", roomImageId='" + roomImageId + '\'' +
                ", cleaningStatus='" + cleaningStatus + '\'' +
                ", features=" + features +
                '}';
    }
}
