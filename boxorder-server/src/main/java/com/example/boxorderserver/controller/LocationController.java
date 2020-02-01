package com.example.boxorderserver.controller;

import com.example.boxorderserver.model.Location;
import com.example.boxorderserver.service.LocationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin
public class LocationController {

	@Autowired
    private LocationService LocationService;


    @GetMapping(value = { "", "/" })
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public @NotNull Iterable<Location> getLocations() {
        return LocationService.getAllLocations();
    }
}
