package com.example.TaalomIT.dtos.response;

import com.example.TaalomIT.enumeration.Role;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Role role;
    private int grade;
    private Date birthDay;
    private Date enrollementDate;
}
