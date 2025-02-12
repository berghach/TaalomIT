package com.example.TaalomIT.services;

import com.example.TaalomIT.dtos.request.UserRequestDTO;
import com.example.TaalomIT.dtos.response.UserResponseDTO;
import com.example.TaalomIT.entities.User;
import com.example.TaalomIT.mappers.UserMapper;
import com.example.TaalomIT.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public Optional<UserResponseDTO> get(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with ID " + id + " not found"));
        UserResponseDTO userResponseDTO = userMapper.toResponseDTO(user);
        return Optional.of(userResponseDTO);
    }


    public List<UserResponseDTO> getAll() {
        List<User> users = userRepository.findAll();
        return users.stream().map(userMapper::toResponseDTO).toList();
    }


    public UserResponseDTO save(UserRequestDTO reqEntity) {
        System.out.println("Mapping.....");
        User mappedUser = userMapper.toEntity(reqEntity);
        System.out.println(mappedUser);
        System.out.println("Inserting...");
        mappedUser.setPassword(passwordEncoder.encode(mappedUser.getPassword()));
        User savedUser = userRepository.insert(mappedUser);
        System.out.println(savedUser);
        return userMapper.toResponseDTO(savedUser);
    }


    public UserResponseDTO update(UserRequestDTO reqEntity, UUID oldId) {
        User existingUser = userRepository.findById(oldId)
                .orElseThrow(() -> new RuntimeException("User with ID " + oldId + " not found"));
        User updatedUser = userMapper.toEntity(reqEntity);
        updatedUser.setId(existingUser.getId());
        updatedUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        User savedUser = userRepository.save(updatedUser);
        return userMapper.toResponseDTO(savedUser);
    }


    public boolean delete(UUID oldId) throws Exception {
        User existingUser = userRepository.findById(oldId)
                .orElseThrow(() -> new Exception("User with ID " + oldId + " not found"));
        userRepository.delete(existingUser);
        return userRepository.existsById(oldId);
    }
}
