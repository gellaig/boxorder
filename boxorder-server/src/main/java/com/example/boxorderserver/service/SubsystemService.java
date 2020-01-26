package com.example.boxorderserver.service;

import com.example.boxorderserver.model.Subsystem;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Validated
public interface SubsystemService {

    @NotNull Iterable<Subsystem> getAllSubsystems();

    Subsystem getSubsystem(@Min(value = 1L, message = "Invalid subsystem ID.") long id);

    Subsystem save(Subsystem subsystem);
}
