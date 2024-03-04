package com.cafe.dto;

import com.cafe.entity.Role;

public class UserAuthenticationDTO {
	
	private int id;
	private Role role;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	
	

}
