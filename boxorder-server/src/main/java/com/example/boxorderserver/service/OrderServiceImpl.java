package com.example.boxorderserver.service;

import com.example.boxorderserver.model.Order;
import com.example.boxorderserver.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Iterable<Order> getAllOrders() {
    	Iterable<Order> ords = this.orderRepository.findAll();
    //	ords.forEach(ord -> System.out.println("********************************************************** " +ord.toString() + " **********************************************************"));
    	return ords;
    }

    @Override
    public Order create(Order order) {
        order.setDateCreated(LocalDate.now());

        return this.orderRepository.save(order);
    }

    @Override
    public void update(Order order) {
        this.orderRepository.save(order);
    }

	@Override
	public Iterable<Order> getAllOrdersByLocation(String id) {
		Iterable<Order> ords = this.orderRepository.findAllByLocation(Long.parseLong(id));
	//	ords.forEach(ord -> System.out.println("********************************************************** " +ord.toString() + " **********************************************************"));
		
		return ords;
    }
}
