package com.tour.Integrated.Travel.Management.Transformers;

import com.tour.Integrated.Travel.Management.Model.User;
import com.tour.Integrated.Travel.Management.dto.Request.UserRequest;
import com.tour.Integrated.Travel.Management.dto.Response.UserResponse;

public class UserTransformer {
    public static User userRequestToUser(UserRequest req){
        if(req == null) return null;
        return User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(req.getPassword())
                .build();
    }
    public static UserResponse UserToUserResponse(User user){
        if(user == null) return null;
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole() != null ? user.getRole().name() : null)
                .build();
    }
}
