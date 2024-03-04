package com.cafe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cafe.dto.CartDTO;
import com.cafe.entity.Cart;
import com.cafe.service.CartService;

import jakarta.servlet.http.HttpServletRequest;


@RestController
@CrossOrigin
@RequestMapping("/carts")
public class CartController {

    @Autowired 
    private CartService cartService;

   
    @PreAuthorize("hasRole('customer')")
    @PostMapping("/addTOCart/{userId}")
    public ResponseEntity<Cart> addItemToCart(@RequestBody Cart cart, HttpServletRequest request,@PathVariable int userId) {
       
        
       
        Cart addedCart = cartService.addItemToCart(cart,userId);
        return new ResponseEntity<>(addedCart, HttpStatus.CREATED);
        
    }
    
    
    
    @PreAuthorize("hasRole('customer')")
    @GetMapping("/fetchTOCart/{userId}")
    public ResponseEntity<List<Cart>> getCartItemsForUser(@PathVariable int userId) {
        List<Cart> cartItems = cartService.getCartItemsForUser(userId);
        return new ResponseEntity<>(cartItems, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public List<Cart> getCartByUserId(@PathVariable int userId) {
        return cartService.getCartByUserId(userId);
    }
    
        
     // Helper method to extract customer ID from JWT token
        
        private int extractUserIdFromToken() {
        	Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (principal instanceof Jwt) {
                Jwt jwt = (Jwt) principal;
                // Extract customer ID from JWT claims
                return Integer.parseInt(jwt.getClaim("customerId").toString());
            } else {
                // Handle the case where the principal is not a Jwt (e.g., if user is not authenticated)
                // You can return a default value or throw an exception based on your application's logic
                return 0; // Example default value, replace with appropriate logic
            }
        }
    }