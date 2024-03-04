package com.cafe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cafe.dto.CartDTO;
import com.cafe.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer>{
	List<Cart> findByuser_id(int userId);
	List<Cart> findById(int Id);
	
//    List<Cart> findByUserId(@Param("userId") int userId);

}
