package com.ecommerce.project2.service;

import com.ecommerce.project2.dto.CreateUserDto;
import com.ecommerce.project2.dto.UserDto;
import com.ecommerce.project2.enums.Role;
import com.ecommerce.project2.model.User;
import com.ecommerce.project2.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public Optional<User> getByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public String createUser(CreateUserDto request) {
        User user = User.builder()
                .username(request.getUsername())
                .name(request.getName())
                .lastName(request.getSurname())
                .email(request.getEmail())
                .password(bCryptPasswordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhone())
                .role(Role.ROLE_USER)
                .build();
        userRepository.save(user);
        return "User created successfully";
    }

}
