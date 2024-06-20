package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.Objects;

@Data
@Builder
@Entity
public class BookService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookServiceId;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private UserAccount customer;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @Temporal(TemporalType.TIMESTAMP)
    private Date bookingDate;

    @Temporal(TemporalType.DATE)
    private Date serviceDate;

    private int quantity;

    private String status;

    private double totalPrice;

    private String specialRequests;

    public BookService() {
    }

    public BookService(Long bookServiceId, UserAccount customer, Service service, Booking booking, Date bookingDate, Date serviceDate, int quantity, String status, double totalPrice, String specialRequests) {
        this.bookServiceId = bookServiceId;
        this.customer = customer;
        this.service = service;
        this.booking = booking;
        this.bookingDate = bookingDate;
        this.serviceDate = serviceDate;
        this.quantity = quantity;
        this.status = status;
        this.totalPrice = totalPrice;
        this.specialRequests = specialRequests;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BookService that)) return false;
        return getQuantity() == that.getQuantity() && Double.compare(that.getTotalPrice(), getTotalPrice()) == 0 && Objects.equals(getBookServiceId(), that.getBookServiceId()) && Objects.equals(getCustomer(), that.getCustomer()) && Objects.equals(getService(), that.getService()) && Objects.equals(getBooking(), that.getBooking()) && Objects.equals(getBookingDate(), that.getBookingDate()) && Objects.equals(getServiceDate(), that.getServiceDate()) && Objects.equals(getStatus(), that.getStatus()) && Objects.equals(getSpecialRequests(), that.getSpecialRequests());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getBookServiceId(), getCustomer(), getService(), getBooking(), getBookingDate(), getServiceDate(), getQuantity(), getStatus(), getTotalPrice(), getSpecialRequests());
    }

    @Override
    public String toString() {
        return "BookService{" +
                "customerId=" + customer.getName() +
                "Phone=" + customer.getPhoneNumber() +
                ", serviceId=" + service.getServiceName() +
                ", bookingRoom=" + booking.getRoom().getRoomName() +
                ", bookingDate=" + bookingDate +
                ", serviceDate=" + serviceDate +
                ", quantity=" + quantity +
                ", status='" + status + '\'' +
                ", totalPrice=" + totalPrice +
                ", specialRequests='" + specialRequests + '\'' +
                '}';
    }
}
