package com.booking.service;

import com.booking.request.AuthRequest;
import com.booking.request.RegisterRequest;
import com.booking.response.AuthResponse;

public interface AuthService {

	  public void register(RegisterRequest request);
	  public AuthResponse login(AuthRequest request);
}
