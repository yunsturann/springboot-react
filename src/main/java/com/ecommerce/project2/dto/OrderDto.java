package com.ecommerce.project2.dto;

import com.ecommerce.project2.model.User;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderDto {
    private Long userId;
    private Long contactInfoId;
    private int quantity;
}