package com.ecommerce.project2.dto;

import com.ecommerce.project2.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Builder
public record CreateUserRequest(
        String name,
        String username,
        String password,
        Set<Role> authorities
) {
}
