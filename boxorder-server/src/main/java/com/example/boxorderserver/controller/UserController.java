package com.example.boxorderserver.controller;

import java.security.Principal;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
	
	@RequestMapping(value = "/user", method = RequestMethod.GET)
    public Principal getUser(Principal user) {
        return user;
    }
	
	 @GetMapping("/subsystem")
	 public @NotNull Iterable<Subsystem> getSubsystems() {
	        return subsystemService.getAllSubsystems();
	 }
	 
	 @PostMapping("/register")
	 public String registerUser(@Valid @RequestBody User user) {
		 return userService.create(user).getUsername();
	 }

}
