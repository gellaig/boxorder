package com.example.boxorderserver.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.boxorderserver.model.Role;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {
	
	//@Query("SELECT u from user u where u.userName = :name")
	//public Optional<User> findByUserName(@Param("name") String name);
	
	//public Optional<User> findByUserName(@Param("name") String name);
}
