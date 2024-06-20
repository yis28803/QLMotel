package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class UserAccount implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userAccountId;

    private String username;
    private String password;
    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    private Date birthDay;

    // Một định danh cho hình ảnh đại diện của người dùng, có thể thay thế bằng URL hình ảnh
    private String userImageId;

    @Enumerated(EnumType.STRING)
    private Role role;

    @JsonIgnore
    @OneToMany(mappedBy = "userAccount", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Token> tokens;

    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserAccount that = (UserAccount) o;
        return Objects.equals(userAccountId, that.userAccountId) && Objects.equals(username, that.username) && Objects.equals(password, that.password) && Objects.equals(role, that.role) && Objects.equals(name, that.name) && Objects.equals(email, that.email) && Objects.equals(phoneNumber, that.phoneNumber) && Objects.equals(birthDay, that.birthDay) && Objects.equals(userImageId, that.userImageId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userAccountId, username, password, role, name, email, phoneNumber, birthDay, userImageId);
    }

    @Override
    public String toString() {
        return "userAccountId=" + userAccountId +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", birthDay=" + birthDay +
                ", userImageId='" + userImageId + '\'' +
                '}';
    }
}
