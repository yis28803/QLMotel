package com.example.backend.config;

import com.example.backend.entity.UserAccount;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import java.util.Date;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "mdTrgvnTFRD4jrKWqLMu4OX+1Iuw7y4qpMzzUiVvVfpcu7YxFbzzkfez6AEJm1oH";

    private long refreshExpiration = 604800000;

    //  Trích xuất tên người dùng (username) từ JWT.
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    //  Trích xuất thông tin cụ thể từ JWT dựa trên một hàm xử lý Claims.
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Tạo JWT cho một người dùng cụ thể.
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    // Tạo JWT cho một người dùng cụ thể với các thông tin bổ sung.
    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        //  return buildToken(extraClaims, userDetails, jwtExpiration);
        return buildToken(extraClaims, userDetails, 1000 * 60 * 60 * 10);
    }

    // Xây dựng JWT
    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    //  Kiểm tra xem JWT có hợp lệ không (không hết hạn và tên người dùng khớp).
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    //  Kiểm tra xem JWT có hết hạn không.
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Trích xuất thời gian hết hạn từ JWT.
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Trích xuất tất cả thông tin từ JWT.
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Lấy key dùng để ký và xác thực JWT.
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateRefreshToken(
            UserDetails userDetails
    ) {
        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
    }

}
