package com.example.boxorderserver.service;

import com.example.boxorderserver.model.OrderProduct;
import com.example.boxorderserver.repository.OrderProductRepository;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class OrderProductServiceImpl implements OrderProductService {

    private OrderProductRepository orderProductRepository;

    public OrderProductServiceImpl(OrderProductRepository orderProductRepository) {
        this.orderProductRepository = orderProductRepository;
    }

    @Override
    public OrderProduct create(OrderProduct orderProduct) {
        return this.orderProductRepository.save(orderProduct);
    }

	@Override
	public void delete(@NotNull(message = "The products for order cannot be null.") @Valid OrderProduct orderProduct) {
		this.orderProductRepository.delete(orderProduct);
		
	}
}
