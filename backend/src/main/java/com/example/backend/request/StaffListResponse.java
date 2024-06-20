package com.example.backend.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StaffListResponse {
    private Long id;
    private String username;
    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    private String birthDay;
    private String userImageId;
    private String role;
}
