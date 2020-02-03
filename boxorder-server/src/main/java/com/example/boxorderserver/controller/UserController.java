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
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.boxorderserver.model.Location;
import com.example.boxorderserver.model.Profile;
import com.example.boxorderserver.model.Subsystem;
import com.example.boxorderserver.model.User;
import com.example.boxorderserver.service.ProfileService;
import com.example.boxorderserver.service.SubsystemService;
import com.example.boxorderserver.service.UserService;

@RestController
@CrossOrigin
public class UserController {

	@Autowired
	SubsystemService subsystemService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	ProfileService profileService;
	
	@GetMapping("/resource")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseBody
    public Map<String, Object> home() {
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("id", UUID.randomUUID().toString());
        model.put("content", "Hello Admin");
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
	 
	 @GetMapping("/profile")
	 @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	 @ResponseBody
	 public Profile getProfile(@RequestParam(name = "user") String name) {
		 if (!name.equals(getCurrentUserName()) ) {
			return null;
		 }
		 
		 return userService.getUser(name).get().getProfile();
	 }
	 
	 @PutMapping("/profile")
	 @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	 @ResponseBody
	 public ResponseEntity<String> updateProfile(@RequestParam(name = "user") String name,@Valid @RequestBody Profile profile) {

		 if (!name.equals(getCurrentUserName()) ) {
				return ResponseEntity.badRequest().body("Wrong user");
		 }
		 
		 Optional<User> existingUser = userService.getUser(name);
		 if(existingUser.isPresent()){
			 Profile existingProfile = existingUser.get().getProfile();
			System.out.println(existingProfile.toString()); 
			
			// if (profile.getDescription() != null )
				 existingProfile.setDescription(profile.getDescription());
			// if (profile.getEmail() != null)
				 existingProfile.setEmail(profile.getEmail());
			// if (profile.getFirstname() != null)
				 existingProfile.setFirstname(profile.getFirstname());
			// if (profile.getLastname() != null)
				 existingProfile.setLastname(profile.getLastname());
			// if (!profile.getSkills().isEmpty())
				 existingProfile.setSkills(profile.getSkills());
			 
			 profileService.update(existingProfile);
		 }
		 	 
		 return ResponseEntity.ok("Updated successfully");			
	 }
	 
	 private String getCurrentUserName() {
		 String username ;
		 Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		 if (principal instanceof UserDetails) {
		   username = ((UserDetails)principal).getUsername();
		 } else {
		   username = principal.toString();
		 }
		 
		 return username; 
	 }
}
