package com.example.backend.config;

import com.example.backend.repository.TokenRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final TokenRepository tokenRepository;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
    throws ServletException, IOException {
        // Bỏ qua xác thực nếu là đăng nhập/đăng ký
        if (request.getServletPath().contains("/api/v1/auth") || request.getServletPath().contains("/api/v1/rooms") ) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // Kiểm tra xem header Authorization có tồn tại hoặc có đúng định dạng không
        // Nếu không tồn tại hoặc không đúng định dạng thì bỏ qua xác thực
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);

        try{
            username = jwtService.extractUsername(jwt); // todo extract the username from jwt token
            // Đảm bảo username được trích xuất từ jwt token tồn tại
            // và kiểm tra xem đã có thng tin xác thực trong spring security context chưa (nếu chưa có nghĩa là người dùng chưa đăng nhập`)
            if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // load thông tin chi tiết của người dùng
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

                var isTokenValid = tokenRepository.findByToken(jwt)
                        .map(t -> !t.isExpired() && !t.isRevoked())
                        .orElse(false);

                // Nếu jwt token hợp lệ thì thiết lập thông tin xác thực cho Spring Security
                if (jwtService.isTokenValid(jwt, userDetails) && isTokenValid) {
                    // todo set the authentication in spring security context
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

                    // Thiết lập chi tiết xác thực bổ sung, như thông tin về IP và session từ yêu cầu HTTP.
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    // Thiết lập thông tin xác thực vào Spring Security Context
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return;
        }
        // Cho phép request đi tiếp
        filterChain.doFilter(request, response);
    }
}
