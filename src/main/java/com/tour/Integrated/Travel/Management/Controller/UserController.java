package com.tour.Integrated.Travel.Management.Controller;

import com.tour.Integrated.Travel.Management.Service.UserService;
import com.tour.Integrated.Travel.Management.dto.Request.UserRequest;
import com.tour.Integrated.Travel.Management.dto.Response.UserResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public UserResponse updateUser(@PathVariable Long id,
                                   @Valid @RequestBody UserRequest req) {
        return userService.updateUser(id, req);
    }
}