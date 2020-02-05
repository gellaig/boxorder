package com.example.boxorderserver.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.boxorderserver.model.City;

@Repository
public interface CityRepository extends CrudRepository<City, String> {
	
}