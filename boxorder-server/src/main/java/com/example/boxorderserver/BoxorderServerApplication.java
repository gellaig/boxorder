package com.example.boxorderserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

import com.example.boxorderserver.model.Location;
import com.example.boxorderserver.model.Product;
import com.example.boxorderserver.model.Role;
import com.example.boxorderserver.model.Subsystem;
import com.example.boxorderserver.model.User;
import com.example.boxorderserver.service.LocationService;
import com.example.boxorderserver.service.ProductService;
import com.example.boxorderserver.service.RoleService;
import com.example.boxorderserver.service.SubsystemService;
import com.example.boxorderserver.service.UserService;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;

@SpringBootApplication
//@EnableAutoConfiguration(exclude = {SecurityAutoConfiguration.class})
public class BoxorderServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BoxorderServerApplication.class, args);
	}

	@Bean
    CommandLineRunner runner(ProductService productService, 
    						LocationService locationService, 
    						SubsystemService subsystemService, 
    						UserService userService,
    						RoleService roleService) {
        return args -> {

           productService.save(new Product(1L, "TV Set", 300.00, "https://bit.ly/3av0zeD"));
           productService.save(new Product(2L, "Xbox", 500.00, "https://bit.ly/3av0zeD"));
           productService.save(new Product(3L, "Sofa", 100.00, "https://bit.ly/3av0zeD"));
       	   productService.save(new Product(4L, "Icecream", 5.00, "https://bit.ly/3av0zeD"));
       	   productService.save(new Product(5L, "Beer", 3.00, "https://bit.ly/3av0zeD"));
       	   productService.save(new Product(6L, "Phone", 500.00, "https://bit.ly/3av0zeD"));
       	   productService.save(new Product(7L, "Watch", 30.00, "https://bit.ly/3av0zeD"));
       	   productService.save(new Product(8L, "Playstation", 500.00, "https://bit.ly/3av0zeD"));
       	   productService.save(new Product(9L, "Controller", 60.00, "https://bit.ly/3av0zeD"));
       	   productService.save(new Product(10L, "VR headset", 600.00, "https://bit.ly/3av0zeD"));
       	   productService.save(new Product(11L, "iPod", 999.00, "https://bit.ly/3av0zeD"));
       	   productService.save(new Product(12L, "iPhone", 899.00, "https://bit.ly/3av0zeD"));
       	   productService.save(new Product(13L, "Laptop", 700.00, "https://bit.ly/3av0zeD"));
       	   productService.save(new Product(14L, "Charger", 25.00, "https://bit.ly/3av0zeD"));
       	   
       	   locationService.save(new Location(1L, "1046 Vaci ut 4"));
	       locationService.save(new Location(2L, "1234 Utca ut 4"));
	       locationService.save(new Location(3L, "1111 Nagy ut 4"));
	       locationService.save(new Location(4L, "2222 Ede ut 4"));
	       	
	       subsystemService.save(new Subsystem(1L, "ecommerce", "0.0.1"));
	       subsystemService.save(new Subsystem(2L, "test", "0.0.1"));
	      	
	       roleService.save(new Role(1L,"ROLE_USER"));
	       roleService.save(new Role(2L,"ROLE_ADMIN"));
	       
	       Set<Role> roles = new HashSet<>();
	       roles.add(roleService.getRoleById(1L).get());
	       roles.add(roleService.getRoleById(2L).get());
	       
	       userService.create(new User("user","123", roles));
        };
    }
}
