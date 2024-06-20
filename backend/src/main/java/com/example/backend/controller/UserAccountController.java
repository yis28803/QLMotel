package com.example.backend.controller;

import com.example.backend.entity.UserAccount;
import com.example.backend.request.ChangePasswordRequest;
import com.example.backend.request.TokenRequest;
import com.example.backend.service.UserAccountService;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserAccountController {

    private final UserAccountService service;

    @PostMapping("/me")
    public UserAccount getUserByUsername(
            @RequestBody TokenRequest tokenRequest
    ) {
        return service.findUserByUserName(tokenRequest.getAccess_token());
    }

    @PatchMapping
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        service.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/name")
    public String getNameByAccessToken(
            @RequestBody TokenRequest tokenRequest
    ) {
        return service.getNameByAccessToken(tokenRequest.getAccess_token());
    }

    @GetMapping("/phone/{id}")
    public String getPhoneById(
            @PathVariable("id") Long id
    ) {
        return service.getPhoneById(id);
    }
}
