package com.example.boxorderserver.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.boxorderserver.model.Role;
import com.example.boxorderserver.model.User;
import com.example.boxorderserver.repository.RoleRepository;
import com.example.boxorderserver.repository.UserRepository;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {
	private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	@Autowired
    private RoleRepository RoleRepository;

	@Override
	public Role save(Role role) {
		return RoleRepository.save(role);
	}

	@Override
	public Optional<Role> getRoleById(Long id) {
		return RoleRepository.findById(id);
	}
}
