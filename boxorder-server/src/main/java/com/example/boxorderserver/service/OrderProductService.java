package com.example.boxorderserver.service;

import com.example.boxorderserver.model.Order;
import com.example.boxorderserver.model.OrderProduct;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Validated
public interface OrderProductService {

    OrderProduct create(@NotNull(message = "The products for order cannot be null.") @Valid OrderProduct orderProduct);
    
    void delete(@NotNull(message = "The products for order cannot be null.") @Valid OrderProduct orderProduct);
}
