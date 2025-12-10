package com.tour.Integrated.Travel.Management.dto.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserRequest {
    @NotBlank
    private String name;
    @NotBlank
    @Email
    private String Email;
    @NotBlank
    private String password;
}
