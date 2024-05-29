package com.ecommerce.project2.controller;

import com.ecommerce.project2.dto.UserDto;
import com.ecommerce.project2.model.User;
import com.ecommerce.project2.service.OrderService;
import com.ecommerce.project2.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/private/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService, OrderService orderService) {
        this.userService = userService;
    }

    @GetMapping("/session")
    public UserDto getUserInfo(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return new UserDto(user.getId(), user.getUsername(), user.getName(), user.getLastName(), user.getEmail(), user.getPhoneNumber(),user.getRole());
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long userId) {
         String result = userService.deleteUserById(userId);
         if (result.equals("User not found")) {
             return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
         }
         return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
