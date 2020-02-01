package com.example.boxorderserver.service;

import com.example.boxorderserver.exception.ResourceNotFoundException;
import com.example.boxorderserver.model.User;
import com.example.boxorderserver.repository.UserRepository;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	@Autowired
    private UserRepository UserRepository;

    @Override
    public User save(User user) {
        return UserRepository.save(user);
    }

	@Override
	public User create(User user) {

		Optional<User> existing = UserRepository.findById(user.getUsername());
		existing.ifPresent(it-> {throw new IllegalArgumentException("Username already exists");});

		String hash = encoder.encode(user.getPassword());
		user.setPassword(hash);
		//System.out.println("*********************getauths:" +user.getAuthorities());
		return UserRepository.save(user);

		//log.info("new user has been created: {}", user.getUsername());
	}
}
