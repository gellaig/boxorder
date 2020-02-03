package com.example.boxorderserver.service;

import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.example.boxorderserver.model.Profile;
import com.example.boxorderserver.model.User;

@Validated
public interface ProfileService {

	Profile create(@NotNull(message = "The profile cannot be null.") @Valid Profile profile);

    void update(@NotNull(message = "The profile cannot be null.") @Valid Profile profile);
    
    Optional<Profile> getProfile(Long id);
}
