package com.example.backend.repository;

import com.example.backend.entity.BookService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookServiceRepository extends JpaRepository<BookService, Long> {
}
