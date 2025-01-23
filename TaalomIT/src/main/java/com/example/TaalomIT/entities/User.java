package com.example.TaalomIT.entities;

import com.example.TaalomIT.enumeration.Role;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Document(collection = "user")
public class User {
    @Id
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Enum<Role> role;
    private int grade;
    private Date birthDay;
    private Date enrollementDate;
}
