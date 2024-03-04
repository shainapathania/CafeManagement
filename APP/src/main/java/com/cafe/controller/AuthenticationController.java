package com.cafe.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cafe.entity.AuthenticationResponse;
import com.cafe.entity.User;
import com.cafe.services.AuthenticationService;

@RestController
@CrossOrigin
//@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {
	
	private final AuthenticationService authService;

	public AuthenticationController(AuthenticationService authService) {
		super();
		this.authService = authService;
	}
	
	@PostMapping("/register/user")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody User request){
		
		AuthenticationResponse authenticationResponse = authService.register(request);
		
		if(authenticationResponse.isSuccess()) {
			ResponseEntity.ok(authenticationResponse);
		}
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body(null);
		
		
		
	}
	
	@PostMapping("/login/user")
	public ResponseEntity<AuthenticationResponse> login(@RequestBody User request){
		
		return ResponseEntity.ok(authService.authenticate(request));
		
//		 AuthenticationResponse authenticationResponse = authService.authenticate(request);

//		    if (authenticationResponse.isSuccess()) {
//		        return ResponseEntity.ok(authenticationResponse);
//		    } else {
//		        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authenticationResponse);
//		    }
		    
		   
	}
	
	@GetMapping("/fetch/user/{userId}")
	public AuthenticationResponse findUser(@PathVariable int userId){
		
		return authService.findUser(userId);
		
	}
	
	@GetMapping("/cafe/fetch")
	public List<User> fetch() {
		
		String role ="Cafe";
		List<User> cafe = authService.fetchAllCafes(role);
		
		return cafe;
	}

	
	
	
	
}

		
