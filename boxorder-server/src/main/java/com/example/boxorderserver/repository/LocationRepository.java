package com.example.boxorderserver.repository;

import com.example.boxorderserver.model.Location;
import org.springframework.data.repository.CrudRepository;

public interface LocationRepository extends CrudRepository<Location, Long> {
}
