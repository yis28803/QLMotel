package com.example.backend.service;

import com.example.backend.entity.UserAccount;
import com.example.backend.repository.UserAccountRepository;
import com.example.backend.request.ChangePasswordRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserAccountService {
    private final PasswordEncoder passwordEncoder;
    private final UserAccountRepository repository;
    private final TokenService tokenService;

    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (UserAccount) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        repository.save(user);
    }

    public String getNameByAccessToken(String accessToken) {
        var userId = tokenService.getUserIdByAccessToken(accessToken);
        System.out.println(userId);
        var name = repository.findNameById(userId);
        System.out.println(name);
        return name;
    }

    public void save(UserAccount userAccount) {
        repository.save(userAccount);
    }

    public Optional<UserAccount> findByEmail(String email) {
        return repository.findByEmail(email);
    }


    public UserAccount findUserByUserName(String accessToken) {
        var userId = tokenService.getUserIdByAccessToken(accessToken);
        return repository.findById(userId).orElseThrow(() -> new IllegalStateException("User not found"));
    }

    public String getPhoneById(Long id) {
        return repository.findPhoneById(id);
    }

    public UserAccount getUserAccountByToken(String realToken) {
        var userId = tokenService.getUserIdByAccessToken(realToken);
        return repository.findById(userId).orElseThrow(() -> new IllegalStateException("User not found"));
    }
}
