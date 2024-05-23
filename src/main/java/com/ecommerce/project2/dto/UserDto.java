package com.ecommerce.project2.dto;

import com.ecommerce.project2.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String name;
    private String lastName;
    private String email;
    private Set<Role> authorities;
}
