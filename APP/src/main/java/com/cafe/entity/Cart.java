package com.cafe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name="cart")
@JsonIgnoreProperties(value= {"handler","hibernateLazyInitalizer","FieldHandler"})
public class Cart {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int cartfoodId;
	
	@Column(name="food_name")
	private String foodName;
	
	private String cafeName;
	
	private String Category;
	
	private int price;
	
	

	private int quantity;
	
	
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="user_id")
	private User user;

	public int getCartfoodId() {
		return cartfoodId;
	}

	public void setCartfoodId(int cartfoodId) {
		this.cartfoodId = cartfoodId;
	}

	public String getFoodName() {
		return foodName;
	}
 
	public void setFoodName(String foodName) {
		this.foodName = foodName;
	}

	public String getCafeName() {
		return cafeName;
	}

	public void setCafeName(String cafeName) {
		this.cafeName = cafeName;
	}

	public String getCategory() {
		return Category;
	}

	public void setCategory(String category) {
		Category = category;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	public User getUserId() {
		return user;
	}

	public void setUserId(User user) {
		this.user = user;
	}
	
	
	
	

}
