package com.example.boxorderserver.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cities")
public class City {

	@Id
	@Column(unique = true)
	@Basic(optional = false)
	private String name;

	
	
	public City(String name) {
		super();
		this.name = name;
	}
	
	public City() {}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "City [name=" + name + "]";
	}
	
	
	
}
