package com.example.boxorderserver.service;

import com.example.boxorderserver.model.Location;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Validated
public interface LocationService {

    @NotNull Iterable<Location> getAllLocations();

    Location getLocation(@Min(value = 1L, message = "Invalid location ID.") long id);

    Location save(Location location);
}
