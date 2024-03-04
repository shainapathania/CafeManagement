package com.cafe.services;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cafe.config.JwtService;
import com.cafe.dto.UserAuthenticationDTO;
import com.cafe.entity.AuthenticationResponse;
import com.cafe.entity.Role;
import com.cafe.entity.User;
import com.cafe.repository.UserRepository;

@Service
public class AuthenticationService {
	
	private final UserRepository repository;
	
	private final PasswordEncoder passwordEncoder;
	
	private final JwtService jwtService;
	
	private final AuthenticationManager authenticationManager;

	
	
	public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService,
			AuthenticationManager authenticationManager) {
		super();
		this.repository = repository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
	}



	public AuthenticationResponse register(User request) {
		
		User user = new User();
		
		user.setFirstName(request.getFirstName());
		user.setUsername(request.getUsername());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		
		user.setRole(request.getRole());
		user.setEmail(request.getEmail());
		
		
			user = repository.save(user);
			
		
		String token = jwtService.generateTokens(user);
		
		UserAuthenticationDTO userDTO = new UserAuthenticationDTO();
		
		userDTO.setId(user.getId());
		userDTO.setRole(user.getRole());
		
		
		
		return new AuthenticationResponse(token,userDTO.getRole(),true,userDTO.getId());
		
	}
	
	public AuthenticationResponse authenticate(User request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						
				request.getUsername(),
				request.getPassword()
				)
				);
		User user = repository.findByUsername(request.getUsername());
		
		String token = jwtService.generateTokens(user);
		
		UserAuthenticationDTO userDTO = new UserAuthenticationDTO();
		
		userDTO.setId(user.getId());
		userDTO.setRole(user.getRole());
		
		return new  AuthenticationResponse(token,userDTO.getRole(),true,userDTO.getId());
	}



	public AuthenticationResponse findUser(int userId) {
		Optional<User> optionalUser = repository.findById(userId);
    	
		UserAuthenticationDTO userDTO = new UserAuthenticationDTO();
		optionalUser.ifPresent(user -> {
	      
	        userDTO.setId(user.getId());
			userDTO.setRole(user.getRole());
	    });
		
		
		return new  AuthenticationResponse(userDTO.getId(),userDTO.getRole());
	}



	



	public  List<User> fetchAllCafes(String role) {
		Role roleEnum = Role.valueOf(role);
//		 List<User> optionalUser = repository.getUsersByRole(role);
		return repository.findByRole(roleEnum);
	}
	

}
