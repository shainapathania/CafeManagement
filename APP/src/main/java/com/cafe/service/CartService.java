package com.cafe.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cafe.dto.CartDTO;
import com.cafe.entity.Cart;
import com.cafe.entity.User;
import com.cafe.repository.CartRepository;
import com.cafe.repository.UserRepository;


@Service
public class CartService {
	
	    @Autowired
	    private CartRepository cartRepository;
	    
	    @Autowired
	    private UserRepository userRepository;

	    public Cart addItemToCart(Cart cart,int userId) {
	        // Implement logic to add item to cart
	    	
	    	Optional<User> optionalUser = userRepository.findById(userId);
	    	
	    	 optionalUser.ifPresent(user -> {
	    	        cart.setUserId(user);
	    	        cartRepository.save(cart);
	    	    });
	    	return cart;
	        
	    }

//		public List<Cart> fetchItemToCart(int userId) {
//			
//			List<Cart> cart = cartRepository.findByuser_id(userId);
//			return cart;
//		}
		
		public List<Cart> getCartItemsForUser(int userId) {
	        return cartRepository.findByuser_id(userId);
	    }
		public List<Cart> getCartByUserId(int userId) {
	        return cartRepository.findByuser_id(userId);
		}
		
//		public List<CartDTO> getCartByUserId(int userId) {
//	        List<Cart> cartList = cartRepository.findById(userId);
//	        return cartList.stream()
//	                .map(this::convertToDto)
//	                .collect(Collectors.toList());
//	    }

	    private CartDTO convertToDto(Cart cart) {
	        CartDTO cartDTO = new CartDTO();
	      
	        cartDTO.setFoodName(cart.getFoodName());
	        cartDTO.setCafeName(cart.getCafeName());
	        cartDTO.setCategory(cart.getCategory());
	        cartDTO.setPrice(cart.getPrice());
	        cartDTO.setQuantity(cart.getQuantity());
	        // You can add more mapping logic if needed
	        return cartDTO;
	    }
//	    public List<Cart> getItemsInCartByCustomerId(int uesrId) {
//	        // Implement logic to retrieve items in cart by customer ID
//	        return cartRepository.findByUserId(uesrId);
//	    }
//
//	    public void updateCartItem(Cart cart) {
//	        // Implement logic to update item in cart
//	        cartRepository.save(cart);
//	    }
//
//	    public void removeItemFromCart(int uesrId) {
//	        // Implement logic to remove item from cart
//	        cartRepository.deleteById(uesrId);
//	    }

	    // Add other methods as needed
	}
