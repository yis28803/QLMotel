package com.example.backend.controller;

import com.example.backend.entity.Booking;
import com.example.backend.entity.UserAccount;
import com.example.backend.request.BookingRequest;
import com.example.backend.request.ResponseBooking;
import com.example.backend.request.TokenRequest;
import com.example.backend.service.BookingService;
import com.example.backend.service.UserAccountService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/v1/booking")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService service;
    private final UserAccountService service2;

    @GetMapping("/all")
    public ResponseEntity<List<ResponseBooking>> getAllBooking() {
        List<ResponseBooking> responseBookings = service.getAllBooking();
        return ResponseEntity.ok(responseBookings);
    }

    @PutMapping("/update/{status}")
    public ResponseEntity<Booking> updateBooking(
            @PathVariable("status") String status,
            @RequestBody String id
    ) {
        // cawst id từ string sang long, biết nó có dạng "{"id":1}"
        String[] arr = id.split(":");
        String[] arr2 = arr[1].split("}");
        Long bookingId = Long.parseLong(arr2[0]);
        Booking booking = service.updateBooking(status, bookingId);
        return ResponseEntity.ok(booking);
    }

    @PostMapping("/create")
    public ResponseEntity<Booking> createBooking(
            @RequestBody BookingRequest request,
            @RequestHeader("Authorization") String token
    ) {
        String realToken = token.substring(7);
        UserAccount userAccount = service2.getUserAccountByToken(realToken);
        try {
            Booking booking = service.createBooking(request, userAccount);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/getBookingByUser")
    public ResponseEntity<List<ResponseBooking>> getBookingByUser(
            @RequestHeader("Authorization") String token
    ) {
        String realToken = token.substring(7);
        UserAccount userAccount = service2.getUserAccountByToken(realToken);
        List<ResponseBooking> responseBookings = service.getBookingByUser(userAccount);
        return ResponseEntity.ok(responseBookings);
    }

    @GetMapping("/getBookingByUserAndRoom/{room_id}")
    public Long getBookingByUserAndRoom(
            @RequestHeader("Authorization") String token,
            @PathVariable("room_id") Long roomId
    ) {
        String realToken = token.substring(7);
        UserAccount userAccount = service2.getUserAccountByToken(realToken);
        List<ResponseBooking> responseBookings = service.getBookingByUser(userAccount);
        for (ResponseBooking responseBooking : responseBookings) {
            if (responseBooking.getRoomId() == roomId) {
                return responseBooking.getBookingId();
            }
        }
        return null;
    }
}
