package com.example.backend.repository;

import com.example.backend.entity.Role;
import com.example.backend.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByUsername(String username);

    @Query("SELECT u.username FROM UserAccount u WHERE u.userAccountId = ?1")
    String findUserNameById(Long id);

    boolean existsByUsername(String username);

    @Query("SELECT u.name FROM UserAccount u WHERE u.userAccountId = ?1")
    String findNameById(Long userId);


    Optional<UserAccount> findByEmail(String email);

    @Query("SELECT u FROM UserAccount u WHERE u.role = ?1")
    List<UserAccount> findAllByRole(Role role);

    @Query("SELECT u.phoneNumber FROM UserAccount u WHERE u.userAccountId = ?1")
    String findPhoneById(Long id);
}
