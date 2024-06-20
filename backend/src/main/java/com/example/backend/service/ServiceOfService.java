package com.example.backend.service;

import com.example.backend.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceOfService {
    private final ServiceRepository serviceRepository;
    public List<com.example.backend.entity.Service> getAllService() {
        return serviceRepository.findAll();
    }

    public com.example.backend.entity.Service getServiceById(Long serviceId) {
        return serviceRepository.findById(serviceId).orElse(null);
    }
}
