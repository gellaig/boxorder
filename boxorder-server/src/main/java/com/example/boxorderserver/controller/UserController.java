package com.example.boxorderserver.controller;

import java.security.Principal;
import java.util.Base64;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.boxorderserver.model.Location;
import com.example.boxorderserver.model.Subsystem;
import com.example.boxorderserver.model.User;
import com.example.boxorderserver.service.SubsystemService;
import com.example.boxorderserver.service.UserService;

@RestController
@CrossOrigin
public class UserController {

	@Autowired
	SubsystemService subsystemService;
	
	@Autowired
	UserService userService;
	
	@RequestMapping("/login")
	public String login(@RequestBody User user) {
		Optional<User> savedUser = userService.getUserByName(user.getUserName());
		
		//System.out.println(user.toString());
		//savedUser.ifPresent(u -> System.out.println(u.toString()));
		
		if (savedUser.isPresent()) {
			return !user.getUserName().equals(savedUser.get().getUserName())
					|| !user.getPassword().equals(savedUser.get().getPassword())
				   ? "Wrong username or password" : user.getUserName() ;	
		} 
		else {
			return "Username not found";
		}

	}
/*
	@RequestMapping("/user")
	public Principal user(HttpServletRequest request) {
		String authToken = request.getHeader("Authorization").substring("Basic".length()).trim();
		return () -> new String(Base64.getDecoder().decode(authToken)).split(":")[0];
	}
*/	
	@RequestMapping("/user")
	public Principal user(Principal principal) {
		System.out.println(principal.toString());
		return principal;
	}
	
	 @GetMapping("/subsystem")
	    public @NotNull Iterable<Subsystem> getSubsystems() {
	        return subsystemService.getAllSubsystems();
	    }
	 
	 @PostMapping("/register")
	 public String registerUser(@RequestBody User user) {
		 Optional<User> savedUser = userService.getUserByName(user.getUserName());
		 
		 //System.out.println(user.toString());
		 //savedUser.ifPresent(u -> System.out.println(u.toString()));
		 
		if ( savedUser.isPresent())
			return "Username already exists.";

	     return userService.save(user).getUserName();
	 }

}
