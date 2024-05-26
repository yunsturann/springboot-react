package com.ecommerce.project2.controller;

import com.ecommerce.project2.dto.OrderDto;
import com.ecommerce.project2.model.Order;
import com.ecommerce.project2.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/private/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> saveOrder(@RequestBody OrderDto orderDto){
        Order order = orderService.saveOrder(orderDto);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable Long userId){
        List<Order> orders = orderService.getOrdersByUserId(userId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/{id}/deliver")
    public ResponseEntity<String> setOrderStatus(@PathVariable Long id){
        Boolean result = orderService.setOrderStatus(id);
        if(result){
            return new ResponseEntity<>("Order status updated to DELIVERED", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<String> cancelOrder(@PathVariable Long id){
        Boolean result = orderService.cancelOrder(id);
        if(result){
            return new ResponseEntity<>("Order status updated to CANCELLED", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
        }
    }


}
