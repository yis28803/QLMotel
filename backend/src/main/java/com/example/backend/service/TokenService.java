package com.example.backend.service;

import com.example.backend.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepository repository;

    public Long getUserIdByAccessToken(String accessToken) {
        return repository.findUserIdByToken(accessToken);
    }

    public void saveTokenWithUserId(String accessToken, Long userId) {
        repository.saveTokenWithUserId(accessToken, userId);
    }
}
