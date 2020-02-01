package com.example.boxorderserver.controller;

import com.example.boxorderserver.model.Product;
import com.example.boxorderserver.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

	@Autowired
    private ProductService productService;

    @GetMapping(value = { "", "/" })
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public @NotNull Iterable<Product> getProducts() {
        return productService.getAllProducts();
    }
}
