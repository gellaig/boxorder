package com.example.boxorderserver.repository;

import com.example.boxorderserver.model.OrderProduct;
import com.example.boxorderserver.model.OrderProductPK;
import org.springframework.data.repository.CrudRepository;

public interface OrderProductRepository extends CrudRepository<OrderProduct, OrderProductPK> {
}
