package com.cafe.controller;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cafe.entity.Address;
import com.cafe.entity.User;
import com.cafe.repository.UserRepository;
import com.cafe.service.AddressService;

@RestController
public class AddressController {
	
	@Autowired
	private AddressService addressService;
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/address/{userId}")
    public void addAddress(@RequestBody Address address,@PathVariable int userId) {
		
		
		
        addressService.addAddress(address,userId);
        
    }

	
	

}
