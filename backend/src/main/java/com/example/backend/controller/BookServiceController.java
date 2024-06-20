package com.example.backend.controller;

import com.example.backend.entity.Service;
import com.example.backend.entity.UserAccount;
import com.example.backend.repository.BookServiceRepository;
import com.example.backend.request.BookServiceRequest;
import com.example.backend.service.BookServiceOfService;
import com.example.backend.service.UserAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/v1/bookservices")
@RequiredArgsConstructor
public class BookServiceController {
    private final BookServiceOfService service;
    private final UserAccountService service2;

    @PostMapping
    public ResponseEntity<?> createBookService(
            @RequestBody BookServiceRequest request,
            @RequestHeader("Authorization") String token

    ) {
        System.out.println(request.toString());
        String realToken = token.substring(7);
        UserAccount userAccount = service2.getUserAccountByToken(realToken);
        service.createBookService(request, userAccount);
        return ResponseEntity.ok("Book service created");
    }

    @GetMapping
    public ResponseEntity<List<com.example.backend.entity.BookService>> getAllBookServices() {
        return ResponseEntity.ok(service.getAllBookServices());
    }

    @PostMapping("/updateStatus")
    public ResponseEntity<?> updateStatus(
            @RequestBody BookServiceRequest request
    ) {
        service.updateStatus(request);
        return ResponseEntity.ok("Status updated");
    }
}
