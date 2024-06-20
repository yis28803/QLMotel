package com.example.backend.repository;

import com.example.backend.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query(value = """
      select t from Token t inner join UserAccount u\s
      on t.userAccount.userAccountId = u.userAccountId\s
      where u.userAccountId = :id and (t.expired = false or t.revoked = false)\s
      """)
    List<Token> findAllValidTokenByUser(Long id);

    Optional<Token> findByToken(String token);

    @Query("SELECT t.userAccount.userAccountId FROM Token t WHERE t.token = ?1")
    Long findUserIdByToken(String token);

    @Query("UPDATE Token t SET t.userAccount.userAccountId = ?2 WHERE t.token = ?1")
    void saveTokenWithUserId(String token, Long userId);

}
