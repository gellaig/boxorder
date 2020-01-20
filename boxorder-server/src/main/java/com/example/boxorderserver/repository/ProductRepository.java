package com.example.boxorderserver.repository;

import com.example.boxorderserver.model.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Long> {
}
