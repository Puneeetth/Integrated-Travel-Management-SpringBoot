package com.tour.Integrated.Travel.Management.dto.Response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;

@Value
@Builder
@Setter
@Getter
public class UserResponse {
          Long id;
          String name;
            String email;
            String role;
}

