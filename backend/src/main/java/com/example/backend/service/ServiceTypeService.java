package com.example.backend.service;

import com.example.backend.entity.ServiceType;
import com.example.backend.repository.ServiceTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ServiceTypeService
{
    private final ServiceTypeRepository repository;

    public List<ServiceType> getAllServiceTypes() {
        return repository.findAll();
    }
}
