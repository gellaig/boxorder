package com.example.boxorderserver.service;

import com.example.boxorderserver.model.Order;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Validated
public interface OrderService {

    @NotNull Iterable<Order> getAllOrders();
    
    Iterable<Order> getAllOrdersByLocation(String id);

    Order create(@NotNull(message = "The order cannot be null.") @Valid Order order);

    void update(@NotNull(message = "The order cannot be null.") @Valid Order order);
    
    void delete(@NotNull(message = "The order cannot be null.") @Valid Order order);
    
    Optional<Order> findById(Long id);
}
