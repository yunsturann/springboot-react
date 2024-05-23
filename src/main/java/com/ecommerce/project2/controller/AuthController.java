package com.ecommerce.project2.controller;

import com.ecommerce.project2.dto.CreateUserRequest;
import com.ecommerce.project2.model.Role;
import com.ecommerce.project2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;
/*
    @PostMapping("/register")
    public ResponseEntity<CreateUserRequest> registerUser(@RequestBody CreateUserRequest request) {
        userService.createUser(request);
        return ResponseEntity.ok(request);
    }*/
}
