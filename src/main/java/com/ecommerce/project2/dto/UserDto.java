package com.ecommerce.project2.dto;

import com.ecommerce.project2.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String name;
    private String lastName;
    private String email;
    private String phoneNumber;
    private Role role;

}
