package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Objects;

@Data
@Entity
public class RoomType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomTypeId;

    private String roomTypeName;
    private String description;
    private int capacity;
    private double basePrice;

    @JsonIgnore
    @OneToMany(mappedBy = "roomType")
    private List<Room> rooms;

    public RoomType() {
    }

    public RoomType(Long roomTypeId, String roomTypeName, String description, int capacity, double basePrice) {
        this.roomTypeId = roomTypeId;
        this.roomTypeName = roomTypeName;
        this.description = description;
        this.capacity = capacity;
        this.basePrice = basePrice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RoomType roomType)) return false;
        return getCapacity() == roomType.getCapacity() && Double.compare(getBasePrice(), roomType.getBasePrice()) == 0 && Objects.equals(getRoomTypeId(), roomType.getRoomTypeId()) && Objects.equals(getRoomTypeName(), roomType.getRoomTypeName()) && Objects.equals(getDescription(), roomType.getDescription()) && Objects.equals(getRooms(), roomType.getRooms());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRoomTypeId(), getRoomTypeName(), getDescription(), getCapacity(), getBasePrice(), getRooms());
    }

    @Override
    public String toString() {
        return "RoomType{" +
                "roomTypeId=" + roomTypeId +
                ", roomTypeName='" + roomTypeName + '\'' +
                ", description='" + description + '\'' +
                ", capacity=" + capacity +
                ", basePrice=" + basePrice +
                ", rooms=" + rooms +
                '}';
    }
}
