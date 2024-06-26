package com.ecommerce.project2.service;

import com.ecommerce.project2.dto.OrderDto;
import com.ecommerce.project2.model.ContactInfo;
import com.ecommerce.project2.model.Order;
import com.ecommerce.project2.enums.OrderStatus;
import com.ecommerce.project2.model.User;
import com.ecommerce.project2.repository.ContactInfoRepository;
import com.ecommerce.project2.repository.OrderRepository;
import com.ecommerce.project2.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    private final UserRepository userRepository;
    private final ContactInfoRepository contactInfoRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository, ContactInfoRepository contactInfoRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.contactInfoRepository = contactInfoRepository;
    }

    public Order saveOrder(OrderDto orderDto) {
        User user = userRepository.findById(orderDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        ContactInfo contactInfo = contactInfoRepository.findById(orderDto.getContactInfoId())
                .orElseThrow(() -> new RuntimeException("Contact info not found"));


        Order order = Order.builder()
                .user(user)
                .contactInfo(contactInfo)
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
    public void cancelOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        for (Order order : orders) {
            order.setStatus(OrderStatus.CANCELLED);
            order.setUser(null);
            order.setContactInfo(null);
            orderRepository.save(order);
        }
    }



}
