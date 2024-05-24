package com.ecommerce.project2.service;

import com.ecommerce.project2.dto.OrderDto;
import com.ecommerce.project2.model.Order;
import com.ecommerce.project2.enums.OrderStatus;
import com.ecommerce.project2.model.User;
import com.ecommerce.project2.repository.OrderRepository;
import com.ecommerce.project2.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public Order saveOrder(OrderDto orderDto) {
        User user = userRepository.findById(orderDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = Order.builder()
                .user(user)
                .quantity(orderDto.getQuantity())
                .status(OrderStatus.RECEIVED)
                .build();

        return orderRepository.save(order);
    }
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Boolean setOrderStatus(Long id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus(OrderStatus.DELIVERED);
            orderRepository.save(order);
            return true;
        } else {
            return false;
        }
    }

    public Boolean cancelOrder(Long id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus(OrderStatus.CANCELLED);
            orderRepository.save(order);
            return true;
        } else {
            return false;
        }
    }



}
