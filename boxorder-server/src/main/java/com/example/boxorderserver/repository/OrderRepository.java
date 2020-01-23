package com.example.boxorderserver.repository;

import com.example.boxorderserver.model.Order;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends CrudRepository<Order, Long> {
	
	//@Query(value = "SELECT * from Orders where location_id = :id", nativeQuery = true)
	@Query("SELECT o from Order o where o.location.id = :id")
	public Iterable<Order> findAllByLocation(@Param("id") Long id);
}
