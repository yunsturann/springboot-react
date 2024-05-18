package com.ecommerce.project2.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/private")
public class PrivateController {

    @GetMapping
    public String getPrivate() {
        return "This is private";
    }

    @GetMapping("/admin")
    public String getAdmin() {
        return "This is admin";
    }

    @GetMapping("/user")
    public String getUser() {
        return "This is user";
    }



}
