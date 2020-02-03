package com.example.boxorderserver.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.boxorderserver.model.Profile;

@Repository
public interface ProfileRepository extends CrudRepository<Profile, Long> {

}
