package com.example.backend.service;

import com.example.backend.entity.BookService;
import com.example.backend.entity.Booking;
import com.example.backend.entity.UserAccount;
import com.example.backend.repository.BookServiceRepository;
import com.example.backend.request.BookServiceRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class BookServiceOfService {
    private final BookServiceRepository bookServiceRepository;
    private final ServiceOfService serviceOfService;
    private final BookingService bookingService;

    public void createBookService(BookServiceRequest request, UserAccount userAccount) {
        com.example.backend.entity.Service service = serviceOfService.getServiceById(request.getServiceId());
        Booking booking = bookingService.getBookingById(request.getBookingId());
        BookService bookService = BookService.builder()
                .customer(userAccount)
                .service(service)
                .booking(booking)
                .bookingDate(Date.from(new Date().toInstant()))
                .serviceDate(Date.from(new Date().toInstant()))
                .quantity(request.getQuantity())
                .status("Pending")
                .totalPrice(request.getTotalPrice())
                .specialRequests("No special requests")
                .build();
        bookServiceRepository.save(bookService);
    }

    public List<BookService> getAllBookServices() {
        return bookServiceRepository.findAll();
    }

    public void updateStatus(BookServiceRequest request) {

    }
}
