package com.example.backend.service;

import com.example.backend.auth.RegisterRequest;
import com.example.backend.config.JwtService;
import com.example.backend.entity.Role;
import com.example.backend.entity.Token;
import com.example.backend.entity.TokenType;
import com.example.backend.entity.UserAccount;
import com.example.backend.exception.UsernameAlreadyExistsException;
import com.example.backend.repository.TokenRepository;
import com.example.backend.repository.UserAccountRepository;
import com.example.backend.request.CreateNewStaffRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserAccountRepository repository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public UserAccount createNewStaff(RegisterRequest request) {
        var user = UserAccount.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .birthDay(request.getBirthDay())
                .address(request.getAddress())
                .userImageId(request.getUserImageId())
                .role(request.getRole())
                .build();
        // Kiểm tra xem username đã tồn tại chưa, nếu tồn tại thì quăng lỗi để handle ở client
        if (repository.existsByUsername(user.getUsername())) {
            throw new UsernameAlreadyExistsException("Username " + request.getUsername() + " already exists");
        }

        var savedUser = repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        try{
            saveUserToken(savedUser, jwtToken);
        } catch (Exception e) {
            throw new RuntimeException("Error when authenticate");
        }

        return savedUser;
    }

    public void saveUserToken(UserAccount user, String jwtToken) {
        var token = Token.builder()
                .userAccount(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();

        tokenRepository.save(token);
    }

    public List<UserAccount>getAllStaff() {
        return repository.findAllByRole(Role.STAFF);
    }

    public void deleteStaff(Long id) {
        try {
            repository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error when delete staff");
        }
    }

    public UserAccount findUserAccountById(Long newEmployeeId) {
        return repository.findById(newEmployeeId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void saveUser(UserAccount userAccount) {
        repository.save(userAccount);
    }

    public UserAccount updateStaff(Long id, CreateNewStaffRequest request) {
        var user = repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setBirthDay(request.getBirthDay());
        user.setAddress(request.getAddress());
        return repository.save(user);
    }
}
