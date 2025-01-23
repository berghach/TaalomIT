package com.example.TaalomIT.dtos.request;

import com.example.TaalomIT.enumeration.Role;
import lombok.Builder;

import java.util.Date;

@Builder
public record UserRequestDTO(
     String firstName,
     String lastName,
     String email,
     String password,
     Enum<Role> role,
     int grade,
     Date birthDay,
     Date enrollementDate
) {
}
