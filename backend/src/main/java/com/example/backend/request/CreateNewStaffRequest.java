package com.example.backend.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateNewStaffRequest {
    private String username;
    private String password;
    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    private Date birthDay;
    private String userImageId;
}
