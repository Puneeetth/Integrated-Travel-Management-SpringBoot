package com.tour.Integrated.Travel.Management.Model;


import com.tour.Integrated.Travel.Management.Enum.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String name;
    @Email
    @Column(unique = true)
    @NotBlank
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

}
