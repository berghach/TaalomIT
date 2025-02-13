package com.example.TaalomIT.mappers;

import com.example.TaalomIT.dtos.request.UserRequestDTO;
import com.example.TaalomIT.dtos.response.UserResponseDTO;
import com.example.TaalomIT.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toEntity(UserRequestDTO userRequestDTO);
    UserResponseDTO toResponseDTO(User user);
}
