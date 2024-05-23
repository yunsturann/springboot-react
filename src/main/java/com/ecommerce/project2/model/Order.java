package com.ecommerce.project2.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "orders")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
/*
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
*/
    @Column(name = "quantity", nullable = false)
    private int quantity;
}