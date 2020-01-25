package com.example.boxorderserver.controller;

import java.security.Principal;
import java.util.Base64;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.boxorderserver.model.Location;
import com.example.boxorderserver.model.Subsystem;
import com.example.boxorderserver.model.User;
import com.example.boxorderserver.service.SubsystemService;

@RestController
@CrossOrigin
public class UserController {

	@Autowired
	SubsystemService subsystemService;
	
	@RequestMapping("/login")
	public boolean login(@RequestBody User user) {
		return user.getUserName().equals("user") && user.getPassword().equals("password");
	}

	@RequestMapping("/user")
	public Principal user(HttpServletRequest request) {
		String authToken = request.getHeader("Authorization").substring("Basic".length()).trim();
		return () -> new String(Base64.getDecoder().decode(authToken)).split(":")[0];
	}
	
	 @GetMapping("/subsystem")
	    public @NotNull Iterable<Subsystem> getSubsystems() {
	        return subsystemService.getAllSubsystems();
	    }

}
