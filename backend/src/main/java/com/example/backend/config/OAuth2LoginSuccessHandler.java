package com.example.backend.config;

import com.example.backend.entity.Role;
import com.example.backend.entity.UserAccount;
import com.example.backend.service.UserAccountService;
import com.example.backend.entity.RegistrationSource;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final UserAccountService userService;

    private String frontendUrl = "http://localhost:3000/";

    private final OAuth2AuthorizedClientService authorizedClientService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws ServletException, IOException, ServletException {

        OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;
        UserAccount userRequest = new UserAccount();
        if ("github".equals(oAuth2AuthenticationToken.getAuthorizedClientRegistrationId())) {
            DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
            Map<String, Object> attributes = principal.getAttributes();
            System.out.println(attributes);
            // String email = attributes.getOrDefault("email", "").toString();
            String email = "tantran.300803@gmail.com";
            String name = attributes.getOrDefault("login", "").toString();

            userService.findByEmail(email)
                    .ifPresentOrElse(user -> {
                        DefaultOAuth2User newUser = new DefaultOAuth2User(
                                List.of(new SimpleGrantedAuthority(user.getRole().name())),
                                attributes, "id");
                        Authentication securityAuth = new OAuth2AuthenticationToken(newUser,
                                List.of(new SimpleGrantedAuthority(user.getRole().name())),
                                oAuth2AuthenticationToken.getAuthorizedClientRegistrationId());
                        SecurityContextHolder.getContext().setAuthentication(securityAuth);
                    }, () -> {
                        UserAccount UserAccount = new UserAccount();
                        UserAccount.setRole(Role.CUSTOMER);
                        UserAccount.setEmail(email);
                        UserAccount.setName(name);
                        userService.save(UserAccount);
                        DefaultOAuth2User newUser = new DefaultOAuth2User(
                                List.of(new SimpleGrantedAuthority(UserAccount.getRole().name())),
                                attributes, "id");
                        Authentication securityAuth = new OAuth2AuthenticationToken(newUser,
                                List.of(new SimpleGrantedAuthority(UserAccount.getRole().name())),
                                oAuth2AuthenticationToken.getAuthorizedClientRegistrationId());
                        SecurityContextHolder.getContext().setAuthentication(securityAuth);
                    });
        }

        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl(frontendUrl);
        OAuth2AuthorizedClient oauth2Client = authorizedClientService.loadAuthorizedClient(
                oAuth2AuthenticationToken.getAuthorizedClientRegistrationId(),
                oAuth2AuthenticationToken.getName());
        String accessToken = oauth2Client.getAccessToken().getTokenValue();
//        String refreshToken = oauth2Client.getRefreshToken().getTokenValue();

        String redirectionUrl = UriComponentsBuilder.fromUriString(frontendUrl)
                .queryParam("access_token", accessToken)
//                .queryParam("refresh_token", refreshToken)
                .build().toUriString();

//        authenticationService.saveUserToken(userRequest, accessToken);
        System.out.println("access_token " + accessToken);
//        System.out.println("refresh_token " + refreshToken);
        getRedirectStrategy().sendRedirect(request, response, redirectionUrl);
    }
}
