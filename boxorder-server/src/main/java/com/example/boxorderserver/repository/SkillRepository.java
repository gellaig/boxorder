package com.example.boxorderserver.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.boxorderserver.model.Skill;

@Repository
public interface SkillRepository extends CrudRepository<Skill, String> {
	
}

