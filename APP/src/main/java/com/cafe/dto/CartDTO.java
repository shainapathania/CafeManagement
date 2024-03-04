package com.cafe.dto;

import com.cafe.entity.User;

public class CartDTO {
	
		private String foodName;
		
		
		
		private String cafeName;
		
		private String Category;
		
		private int price;
		
		private int quantity;
		
		private int id;

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
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

		

}
