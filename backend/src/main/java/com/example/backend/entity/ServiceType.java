package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Objects;

@Data
@Entity
public class ServiceType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceTypeId;

    private String serviceTypeName;

    private String description;

    @JsonManagedReference
    @JsonIgnore
    @OneToMany(mappedBy = "serviceType")
    private List<Service> services;

    public ServiceType() {
    }

    public ServiceType(String serviceName, String description, List<Service> services) {
        this.serviceTypeName = serviceName;
        this.description = description;
        this.services = services;
    }

    @Override
    public String toString() {
        return "ServiceType{" +
                "serviceTypeId=" + serviceTypeId +
                ", serviceTypeName='" + serviceTypeName + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
