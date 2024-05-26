package com.ecommerce.project2.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@Data
@AllArgsConstructor
@Builder
public class CreateUserDto {
    private String name;
    private String surname;
    private String username;
    private String password;
    private String email;
    private String phone;
}
