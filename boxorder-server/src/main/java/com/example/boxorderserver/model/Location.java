package com.example.boxorderserver.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Entity
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Location name required")
    @Basic(optional = false)
    private String name;
    

    public Location(Long id, @NotNull(message = "Location name required") String name) {
        this.id = id;
        this.name = name;
     
    }

    public Location() {
    }

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

	@Override
	public String toString() {
		return "Location [id=" + id + ", name=" + name + "]";
	}

    
}
