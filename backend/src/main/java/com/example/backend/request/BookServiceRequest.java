package com.example.backend.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class BookServiceRequest {
    private Long serviceId;
    private Long bookingId;
    private int quantity;
    private String status;
    private double totalPrice;
}
