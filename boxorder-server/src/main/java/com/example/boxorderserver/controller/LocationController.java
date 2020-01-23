package com.example.boxorderserver.controller;

import com.example.boxorderserver.model.Location;
import com.example.boxorderserver.service.LocationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

	@Autowired
    private LocationService LocationService;


    @GetMapping(value = { "", "/" })
    public @NotNull Iterable<Location> getLocations() {
        return LocationService.getAllLocations();
    }
}
