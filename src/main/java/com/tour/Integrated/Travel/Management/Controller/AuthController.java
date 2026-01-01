package com.tour.Integrated.Travel.Management.Controller;

import com.tour.Integrated.Travel.Management.Enum.Role;
import com.tour.Integrated.Travel.Management.Model.User;
import com.tour.Integrated.Travel.Management.Repository.UserRepository;
import com.tour.Integrated.Travel.Management.config.JwtUtil;
import com.tour.Integrated.Travel.Management.dto.Request.AuthRequest;
import com.tour.Integrated.Travel.Management.dto.Request.RegisterRequest;
import com.tour.Integrated.Travel.Management.dto.Response.AuthResponse;
import jakarta.validation.Valid;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

        private final UserRepository userRepository;
        private final BCryptPasswordEncoder encoder;
        private final JwtUtil jwtUtil;

        public AuthController(UserRepository userRepository,
                        BCryptPasswordEncoder encoder,
                        JwtUtil jwtUtil) {

                this.userRepository = userRepository;
                this.encoder = encoder;
                this.jwtUtil = jwtUtil;
        }

        @PostMapping("/register")
        public AuthResponse register(@Valid @RequestBody RegisterRequest req) {

                if (userRepository.findByEmail(req.getEmail()).isPresent()) {
                        return new AuthResponse("");
                }

                User u = new User();
                u.setName(req.getName());
                u.setEmail(req.getEmail());
                u.setPassword(encoder.encode(req.getPassword()));
                u.setRole(Role.TOURIST);

                userRepository.save(u);

                Map<String, Object> claims = new HashMap<>();
                claims.put("role", u.getRole().name());

                String token = jwtUtil.generateToken(u.getEmail(), claims);

                return new AuthResponse(token);
        }

        @PostMapping("/login")
        public AuthResponse login(@Valid @RequestBody AuthRequest req) {

                var opt = userRepository.findByEmail(req.getEmail());
                if (opt.isEmpty())
                        return new AuthResponse("");

                User u = opt.get();

                if (!encoder.matches(req.getPassword(), u.getPassword())) {
                        return new AuthResponse("");
                }

                Map<String, Object> claims = new HashMap<>();
                claims.put("role", u.getRole().name());
                claims.put("userId", u.getId());
                claims.put("name", u.getName());

                String token = jwtUtil.generateToken(u.getEmail(), claims);

                return new AuthResponse(token);
        }

        @PostMapping("/admin/login")
        public AuthResponse adminLogin(@Valid @RequestBody AuthRequest req) {

                var opt = userRepository.findByEmail(req.getEmail());
                if (opt.isEmpty())
                        return new AuthResponse("");

                User u = opt.get();

                // Check if user is ADMIN
                if (u.getRole() != Role.ADMIN) {
                        return new AuthResponse("");
                }

                if (!encoder.matches(req.getPassword(), u.getPassword())) {
                        return new AuthResponse("");
                }

                Map<String, Object> claims = new HashMap<>();
                claims.put("role", u.getRole().name());
                claims.put("userId", u.getId());
                claims.put("name", u.getName());

                String token = jwtUtil.generateToken(u.getEmail(), claims);

                return new AuthResponse(token);
        }

        // Temporary endpoint to setup admin - remove after first use
        @PostMapping("/setup-admin")
        public String setupAdmin() {
                var opt = userRepository.findByEmail("admin@travelease.com");
                if (opt.isPresent()) {
                        User u = opt.get();
                        u.setPassword(encoder.encode("admin123"));
                        u.setRole(Role.ADMIN);
                        userRepository.save(u);
                        return "Admin password reset successfully";
                }

                // Create new admin if doesn't exist
                User admin = new User();
                admin.setName("Admin");
                admin.setEmail("admin@travelease.com");
                admin.setPassword(encoder.encode("admin123"));
                admin.setRole(Role.ADMIN);
                userRepository.save(admin);
                return "Admin created successfully";
        }
}
