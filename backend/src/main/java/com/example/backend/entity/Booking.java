package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;


@Data
@Builder
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonProperty("customerId")
    private UserAccount customer;

    @ManyToOne
    @JoinColumn(name = "room_id")
    @JsonProperty("roomId")
    private Room room;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date endDate;

    private double totalPrice;

    private String status;

    @Temporal(TemporalType.TIMESTAMP)
    private Date bookingDate;

    private String specialRequests;

    public Booking() {
    }

    public Booking(Long bookingId, UserAccount customer, Room room, Date startDate, Date endDate, double totalPrice, String status, Date bookingDate, String specialRequests) {
        this.bookingId = bookingId;
        this.customer = customer;
        this.room = room;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalPrice = totalPrice;
        this.status = status;
        this.bookingDate = bookingDate;
        this.specialRequests = specialRequests;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "customerId=" + customer.getUserAccountId() +
                ", roomId=" + room.getRoomId() +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", totalPrice=" + totalPrice +
                ", status='" + status + '\'' +
                ", bookingDate=" + bookingDate +
                ", specialRequests='" + specialRequests + '\'' +
                '}';
    }
}
