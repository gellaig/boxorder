package com.example.boxorderserver.service;

import java.util.Optional;

import org.springframework.validation.annotation.Validated;

import com.example.boxorderserver.model.Role;
import com.example.boxorderserver.model.User;

@Validated
public interface RoleService {
	 Role save(Role role);
	 
	 Optional<Role> getRoleById(Long id);
}
