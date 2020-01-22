package com.example.boxorderserver.repository;

import com.example.boxorderserver.model.Order;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends CrudRepository<Order, Long> {
	
	//@Query("SELECT o from Orders o where o.location_id = :id")
	@Query(value = "SELECT * from Orders where location_id = :id", nativeQuery = true)
	public Iterable<Order> findAllByLocation(@Param("id") String id);
}
