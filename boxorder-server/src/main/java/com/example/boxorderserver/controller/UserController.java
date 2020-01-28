package com.example.boxorderserver.controller;

import java.security.Principal;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
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
	
	@GetMapping("/resource")
    @ResponseBody
    public Map<String, Object> home() {
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("id", UUID.randomUUID().toString());
        model.put("content", "Hello World");
        return model;
    } 
	
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
	@GetMapping("/user")
    @ResponseBody
    public Principal user(Principal user) {
        return user;
    }
	
	 @GetMapping("/subsystem")
	 public @NotNull Iterable<Subsystem> getSubsystems() {
	        return subsystemService.getAllSubsystems();
	    }
	 
	 @PostMapping("/register")
	 public String registerUser(@RequestBody User user) {
		 Optional<User> existing = userService.getUserByName(user.getUserName());

		 //System.out.println(user.toString());
		 //savedUser.ifPresent(u -> System.out.println(u.toString()));
		 
		if ( existing.isPresent())
			return "Username already exists.";

	     return userService.save(user).getUserName();
	 }

}
