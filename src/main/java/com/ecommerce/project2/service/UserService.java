package com.ecommerce.project2.service;

import com.ecommerce.project2.dto.CreateUserRequest;

import com.ecommerce.project2.model.Role;
import com.ecommerce.project2.model.User;
import com.ecommerce.project2.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

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
/*
    public User createUser(CreateUserRequest request) {

        User newUser = User.builder()
                .name(request.name())
                .username(request.username())
                .password(bCryptPasswordEncoder.encode(request.password()))
                .authorities((Set.of(Role.ROLE_USER))
                .build();

        return userRepository.save(newUser);
    }
*/
}
