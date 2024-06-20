package com.example.backend.request;


import com.example.backend.entity.Booking;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseBooking {
    @JsonProperty("booking_id")
    private Long bookingId;
    @JsonProperty("customer_id")
    private Long customerId;
    @JsonProperty("room_id")
    private Long roomId;
    @JsonProperty("start_date")
    private String startDate;
    @JsonProperty("end_date")
    private String endDate;
    @JsonProperty("total_price")
    private double totalPrice;
    @JsonProperty("status")
    private String status;
    @JsonProperty("booking_date")
    private String bookingDate;
    @JsonProperty("special_requests")
    private String specialRequests;

    public static List<ResponseBooking> fromEntityList(List<Booking> bookings) {
        return bookings.stream().map(booking -> ResponseBooking.builder()
                .bookingId(booking.getBookingId())
                .customerId(booking.getCustomer().getUserAccountId())
                .roomId(booking.getRoom().getRoomId())
                .startDate(booking.getStartDate().toString())
                .endDate(booking.getEndDate().toString())
                .totalPrice(booking.getTotalPrice())
                .status(booking.getStatus())
                .bookingDate(booking.getBookingDate().toString())
                .specialRequests(booking.getSpecialRequests())
                .build()).toList();
    }
}
