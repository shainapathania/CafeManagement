package com.cafe.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cafe.entity.Address;
import com.cafe.entity.User;
import com.cafe.repository.AddressRepository;
import com.cafe.repository.UserRepository;

@Service
public class AddressService {
	
	@Autowired
    private AddressRepository addressRepository;
	
	@Autowired
	private UserRepository userRepository;

    public void addAddress(Address address,int userId) {
    	Optional<User> optionalUser = userRepository.findById(userId);
    	
    	 optionalUser.ifPresent(user -> {
    	        address.setUser(user);
    	        addressRepository.save(address);
    	    });
    }

}
