package com.example.boxorderserver.service;

import com.example.boxorderserver.exception.ResourceNotFoundException;
import com.example.boxorderserver.model.Subsystem;
import com.example.boxorderserver.repository.SubsystemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SubsystemServiceImpl implements SubsystemService {

	@Autowired
    private SubsystemRepository SubsystemRepository;

    @Override
    public Iterable<Subsystem> getAllSubsystems() {
        return SubsystemRepository.findAll();
    }

    @Override
    public Subsystem getSubsystem(long id) {
        return SubsystemRepository
          .findById(id)
          .orElseThrow(() -> new ResourceNotFoundException("Subsystem not found"));
    }

    @Override
    public Subsystem save(Subsystem Subsystem) {
        return SubsystemRepository.save(Subsystem);
    }
}
