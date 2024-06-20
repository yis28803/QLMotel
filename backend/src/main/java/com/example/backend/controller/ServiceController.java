package com.example.backend.controller;

import com.example.backend.entity.Service;
import com.example.backend.service.ServiceOfService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@RestController
@RequestMapping("/api/v1/services")
@AllArgsConstructor
public class ServiceController {
    private final ServiceOfService service;

    @GetMapping
    public List<Service> getAllService() {
        return service.getAllService();
    }

    @PostMapping("/add-service")
    public void addService(

    ) {
        System.out.println("Add service");
    }
}
