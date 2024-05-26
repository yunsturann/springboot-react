package com.ecommerce.project2.controller;

import com.ecommerce.project2.dto.CreateUserDto;
import com.ecommerce.project2.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody CreateUserDto request) {
        userService.createUser(request);
        return ResponseEntity.status(201).body("User created successfully");
    }
}
