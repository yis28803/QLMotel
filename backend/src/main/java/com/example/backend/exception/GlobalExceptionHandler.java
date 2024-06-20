package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<Object> handleUsernameAlreadyExists(UsernameAlreadyExistsException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("error", "Username already exists");
        response.put("message", ex.getMessage());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

//    @ExceptionHandler(AnotherCustomException.class)
//    public ResponseEntity<Object> handleAnotherCustomException(AnotherCustomException ex) {
//        // Xử lý AnotherCustomException
//        Map<String, Object> response = new HashMap<>();
//        response.put("error", "A different error occurred");
//        response.put("message", ex.getMessage());
//        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//    }
//
//    // Thêm các handlers cho các exceptions khác nếu cần
}

