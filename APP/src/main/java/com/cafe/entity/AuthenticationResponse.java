package com.cafe.entity;

public class AuthenticationResponse {
	
	private int id;
	private String  token;
	private boolean success;
    private String message;
    private Role role;
    
    public AuthenticationResponse(String message) {
    	
    	this.message=message;
    }
    
    public AuthenticationResponse(int id,Role role) {
    	this.token=token;
    	this.role=role;
    }
	
	public AuthenticationResponse(String token,Role role,boolean success,int id) {
		this.token=token;
		this.success=success;
		this.role=role;
		this.id=id;
		
	}
	
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

//	public void setToken(String token) {
//		this.token = token;
//	}

	public void setRole(Role role) {
		this.role = role;
	}

	public boolean isSuccess() {
		return success;
	}



	public void setSuccess(boolean success) {
		this.success = success;
	}



	public String getMessage() {
		return message;
	}



	public void setMessage(String message) {
		this.message = message;
	}



	public Role getRole() {
		return role;
	}



//	public void setRole(Role role) {
//		this.role = role;
//	}



	public String getToken() {
		return token;
	}

}
