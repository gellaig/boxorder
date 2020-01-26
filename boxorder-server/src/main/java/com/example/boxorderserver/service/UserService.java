package com.example.boxorderserver.service;

import com.example.boxorderserver.model.User;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Validated
public interface UserService {

    @NotNull Iterable<User> getAllUsers();

    Optional<User> getUser(@Min(value = 1L, message = "Invalid User ID.") long id);
    
    Optional<UserDetails> getUserByName(String userName);
    
    User save(User user);
}
