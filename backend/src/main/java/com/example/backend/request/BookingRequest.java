package com.example.backend.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class BookingRequest {
    private Long roomId;
    private String startDate;
    private String endDate;
    private double totalPrice;
    private String status;
    private String bookingDate;
    private String specialRequests;
    private String access_token;
}
