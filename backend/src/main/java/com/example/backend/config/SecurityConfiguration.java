package com.example.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;
    private static final String[] WHITE_LIST_URL = {
            "/api/v1/auth/**",
            "/api/v1/rooms/**",
            "/api/v1/admin/**",
            "/api/v1/staff/**",
            "/api/v1/customer/**",
            "/api/v1/services/**",
            "/api/v1/roomtypes/**",
            "/api/v1/serviceTypes/**",
            "/api/v1/users/**",
            "/api/v1/booking/**",
            "/api/v1/roomservice/**",
            "/api/v1/bookservices/**",
    };

    //cấu hình chi tiết cách bảo mật cho các yêu cầu HTTP
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(req ->
                        req.requestMatchers(WHITE_LIST_URL).permitAll()
//                                .requestMatchers("/api/v1/admin/**").hasRole(ADMIN.name())
//                                .requestMatchers("/api/v1/staff/**").hasAnyRole(ADMIN.name(), STAFF.name())
//                                .requestMatchers("/api/v1/customer/**").hasAnyRole(ADMIN.name(), STAFF.name(), CUSTOMER.name())
//                                .requestMatchers("/api/v1/users/**").hasAnyRole(ADMIN.name(), STAFF.name(), CUSTOMER.name())
                                .anyRequest().authenticated()

                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
//                .oauth2Login(oath2 -> {
//                    oath2.loginPage("/login").permitAll();
//                    oath2.successHandler(oAuth2LoginSuccessHandler);
//                })
                .logout(logout ->
                        logout.logoutUrl("/api/v1/auth/logout")
                                .addLogoutHandler(logoutHandler)
                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                )
        ;
        return http.build();
    }

    @Autowired
    private OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
}
