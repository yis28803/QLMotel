package com.example.backend.service;

import com.example.backend.entity.Booking;
import com.example.backend.entity.Room;
import com.example.backend.entity.UserAccount;
import com.example.backend.repository.RoomRepository;
import com.example.backend.request.BookingRequest;
import com.example.backend.request.ResponseBooking;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.backend.repository.BookingRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class BookingService {
    private final BookingRepository repository;
    private final RoomRepository roomRepository;

    public List<ResponseBooking> getAllBooking() {
        List<Booking> bookings = repository.findAll();
        List<ResponseBooking> responseBookings = ResponseBooking.fromEntityList(bookings);
        return responseBookings;
    }

    public Booking updateBooking(String status, Long id) {
        Booking booking = repository.findById(id).orElseThrow();
        booking.setStatus(status);
        repository.save(booking);
        return booking;
    }

    public Booking addBooking(BookingRequest bookingRequest, UserAccount a) {
        return null;
    }

    public Booking createBooking(BookingRequest request, UserAccount userAccount) throws ParseException {
        Room room = roomRepository.findById(request.getRoomId()).orElseThrow();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = dateFormat.parse(request.getStartDate());
        Date endDate = dateFormat.parse(request.getEndDate());
        Date bookingDate = dateFormat.parse(request.getBookingDate());
        Booking booking = Booking.builder()
                .room(room)
                .startDate(startDate)
                .endDate(endDate)
                .totalPrice(request.getTotalPrice())
                .status(request.getStatus())
                .bookingDate(bookingDate)
                .specialRequests(request.getSpecialRequests())
                .customer(userAccount)
                .build();
        repository.save(booking);
        return booking;
    }

    public List<ResponseBooking> getBookingByUser(UserAccount userAccount) {
        List<Booking> bookings = repository.findByCustomer(userAccount);
        List<ResponseBooking> responseBookings = ResponseBooking.fromEntityList(bookings);
        return responseBookings;

    }

    public Booking getBookingById(Long bookingId) {
        return repository.findById(bookingId).orElse(null);
    }
}
