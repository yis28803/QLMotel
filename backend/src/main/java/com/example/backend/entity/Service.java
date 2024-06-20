package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    private String serviceName;

    @ManyToOne
    @JoinColumn(name = "service_type_id")
    private ServiceType serviceType;

    private boolean availability;

    private double price;

    private String schedule;

    private String location;

    private String serviceImage;

    private String termsAndConditions;

    private int quantity;

    public Service(String serviceName, ServiceType serviceType, boolean availability, double price, String schedule, String location, String serviceImageId, String termsAndConditions, int quantity) {
        this.serviceName = serviceName;
        this.serviceType = serviceType;
        this.availability = availability;
        this.price = price;
        this.schedule = schedule;
        this.location = location;
        this.serviceImage = serviceImageId;
        this.termsAndConditions = termsAndConditions;
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Service service)) return false;
        return isAvailability() == service.isAvailability() && Double.compare(getPrice(), service.getPrice()) == 0 && getQuantity() == service.getQuantity() && Objects.equals(getServiceId(), service.getServiceId()) && Objects.equals(getServiceName(), service.getServiceName()) && Objects.equals(getServiceType(), service.getServiceType()) && Objects.equals(getSchedule(), service.getSchedule()) && Objects.equals(getLocation(), service.getLocation()) && Objects.equals(getServiceImage(), service.getServiceImage()) && Objects.equals(getTermsAndConditions(), service.getTermsAndConditions());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getServiceId(), getServiceName(), getServiceType(), isAvailability(), getPrice(), getSchedule(), getLocation(), getServiceImage(), getTermsAndConditions(), getQuantity());
    }

    @Override
    public String toString() {
        return "Service{" +
                "serviceId=" + serviceId +
                ", serviceName='" + serviceName + '\'' +
                ", serviceType=" + (serviceType != null ? serviceType.getServiceTypeId() : null) +
                ", availability=" + availability +
                ", price=" + price +
                ", schedule='" + schedule + '\'' +
                ", location='" + location + '\'' +
                ", serviceImage='" + serviceImage + '\'' +
                ", termsAndConditions='" + termsAndConditions + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}
