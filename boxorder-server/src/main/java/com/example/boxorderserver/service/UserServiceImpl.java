package com.example.boxorderserver.service;

import com.example.boxorderserver.exception.ResourceNotFoundException;
import com.example.boxorderserver.model.Profile;
import com.example.boxorderserver.model.Role;
import com.example.boxorderserver.model.User;
import com.example.boxorderserver.repository.UserRepository;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

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

	@Autowired
    private ProfileService profileService;
	
	@Autowired
    private RoleService roleService;

	
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
		
		Profile userProfile = profileService.create(new Profile());
		user.setProfile(userProfile);
		
		Set<Role> userRoles = new HashSet<>();
	    userRoles.add(roleService.getRoleById(1L).get()); //Default: ROLE_USER
		user.setRoles(userRoles);
		
		System.out.println(user.toString());
		
		return UserRepository.save(user);

		//log.info("new user has been created: {}", user.getUsername());
	}

	@Override
	public Optional<User> getUser(String name) {
		return UserRepository.findById(name);
	}
}
