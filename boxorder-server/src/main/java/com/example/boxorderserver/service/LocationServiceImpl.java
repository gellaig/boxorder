package com.example.boxorderserver.service;

import com.example.boxorderserver.exception.ResourceNotFoundException;
import com.example.boxorderserver.model.Location;
import com.example.boxorderserver.repository.LocationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LocationServiceImpl implements LocationService {

	@Autowired
    private LocationRepository locationRepository;

    @Override
    public Iterable<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    @Override
    public Location getLocation(long id) {
        return locationRepository
          .findById(id)
          .orElseThrow(() -> new ResourceNotFoundException("Location not found"));
    }

    @Override
    public Location save(Location location) {
        return locationRepository.save(location);
    }
}
