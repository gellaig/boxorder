package com.example.boxorderserver.repository;

import com.example.boxorderserver.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
	
	//@Query("SELECT u from user u where u.userName = :name")
	//public Optional<User> findByUserName(@Param("name") String name);
	
	//public Optional<User> findByUserName(@Param("name") String name);
}

