package com.example.backend.repository;

import com.example.backend.entity.Booking;
import com.example.backend.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    @Query("SELECT b FROM Booking b WHERE b.customer = ?1")
    List<Booking> findByCustomer(UserAccount userAccount);
}
