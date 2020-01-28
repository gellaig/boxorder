package com.example.boxorderserver.service;

import com.example.boxorderserver.model.User;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Validated
public interface UserService {
    
    User save(User user);
    User create(User user);

}
