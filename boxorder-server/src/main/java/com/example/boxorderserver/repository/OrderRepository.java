package com.example.boxorderserver.repository;

import com.example.boxorderserver.model.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order, Long> {
}
