package com.booking.controller;

import com.booking.modal.User;
import com.booking.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public User getUserProfile(Authentication authentication) {

        String email = authentication.getName();

        return userService.getCurrentUser(email);
    }
}