package com.tour.Integrated.Travel.Management.Service;

import com.tour.Integrated.Travel.Management.Model.User;
import com.tour.Integrated.Travel.Management.Repository.UserRepository;
import com.tour.Integrated.Travel.Management.Transformers.UserTransformer;
import com.tour.Integrated.Travel.Management.dto.Request.UserRequest;
import com.tour.Integrated.Travel.Management.dto.Response.UserResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public UserResponse getUserById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        return UserTransformer.UserToUserResponse(user);
    }
    public List<UserResponse> getAllUsers(){
        return userRepository.findAll()
                .stream()
                .map(UserTransformer::UserToUserResponse)
                .toList();
    }
    public UserResponse updateUser(Long id, UserRequest req){
        User existing = userRepository.findById(id)
                .orElseThrow(() ->new RuntimeException("User Not Found"));

        existing.setName(req.getName());
        existing.setEmail(req.getEmail());
        existing.setPassword(req.getPassword());
        User saved = userRepository.save(existing);
        return UserTransformer.UserToUserResponse(saved);
    }
    public void deleteUser(Long id){
        if(!userRepository.existsById(id)){
            throw new RuntimeException("User Not Found");
        }
    }

}
