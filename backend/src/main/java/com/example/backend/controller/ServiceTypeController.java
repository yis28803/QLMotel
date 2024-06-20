package com.example.backend.controller;

import com.example.backend.entity.ServiceType;
import com.example.backend.service.ServiceTypeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@RestController
@RequestMapping("/api/v1/serviceTypes")
@AllArgsConstructor
public class ServiceTypeController {
    private final ServiceTypeService serviceTypeService;

    @GetMapping
    public List<ServiceType> getAllServiceTypes() {
        return serviceTypeService.getAllServiceTypes();
    }
}
