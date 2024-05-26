package com.ecommerce.project2.controller;

import com.ecommerce.project2.dto.UserDto;
import com.ecommerce.project2.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/private/user")
public class UserController {

    @GetMapping("/session")
    public UserDto getUserInfo(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return new UserDto(user.getId(), user.getUsername(), user.getName(), user.getLastName(), user.getEmail(), user.getPhoneNumber(),user.getRole());
    }
}
