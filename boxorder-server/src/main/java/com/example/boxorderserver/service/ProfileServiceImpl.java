package com.example.boxorderserver.service;

import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.boxorderserver.model.Profile;
import com.example.boxorderserver.repository.CityRepository;
import com.example.boxorderserver.repository.ProfileRepository;
import com.example.boxorderserver.repository.SkillRepository;

@Service
@Transactional
public class ProfileServiceImpl implements ProfileService {

	@Autowired
    private ProfileRepository profileRepository;
	
	@Autowired
    private SkillRepository skillRepository;
	
	@Autowired
    private CityRepository cityRepository;

	@Override
	public Profile create(@NotNull(message = "The profile cannot be null.") @Valid Profile profile) {
		profile.getSkills().forEach(skill -> skillRepository.save(skill));
		profile.getCities().forEach(city -> cityRepository.save(city));
		
		return profileRepository.save(profile);
	}

	@Override
	public void update(@NotNull(message = "The profile cannot be null.") @Valid Profile profile) {
		System.out.println(profile.toString());
		
		profile.getSkills().forEach(skill -> skillRepository.save(skill));
		profile.getCities().forEach(city -> cityRepository.save(city));
		
		profileRepository.save(profile);
	}

	@Override
	public Optional<Profile> getProfile(Long id) {
		return profileRepository.findById(id);
	}
}
