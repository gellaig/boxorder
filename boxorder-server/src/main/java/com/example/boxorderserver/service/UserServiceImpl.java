package com.example.boxorderserver.service;

import com.example.boxorderserver.exception.ResourceNotFoundException;
import com.example.boxorderserver.model.User;
import com.example.boxorderserver.repository.UserRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
    public Iterable<User> getAllUsers() {
        return UserRepository.findAll();
    }

    @Override
    public Optional<User> getUser(long id) {
        return UserRepository.findById(id);
    }

    @Override
    public User save(User user) {
    	
    	//String hash = encoder.encode(user.getPassword());
		//user.setPassword(hash);
		//System.out.println("Bcrypt password:" + user.getPassword());
		
        return UserRepository.save(user);
    }

	@Override
	public Optional<User> getUserByName(String userName) {
		return UserRepository.findByUserName(userName);
	}
}
