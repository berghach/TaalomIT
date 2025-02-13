package com.example.TaalomIT.controllers;

import com.example.TaalomIT.dtos.request.AuthRequest;
import com.example.TaalomIT.dtos.request.UserRequestDTO;
import com.example.TaalomIT.entities.User;
import com.example.TaalomIT.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@RequestBody UserRequestDTO reqEntity){
        userService.save(reqEntity);
        return "Registration successful";
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest authRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.email(), authRequest.password()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return "Login successful";
    }
}
