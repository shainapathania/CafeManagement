package com.cafe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cafe.entity.Role;
import com.cafe.entity.User;

public interface UserRepository  extends JpaRepository<User,Integer>{
	
	User findByUsername(String username);

	List<User> getUsersByRole(String role);

	List<User> findByRole(Role roleEnum);
	
	

}
