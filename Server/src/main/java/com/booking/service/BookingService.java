package com.booking.service;

import java.util.List;

import com.booking.request.BookingRequest;
import com.booking.response.BookingResponse;

public interface BookingService {
	    BookingResponse bookEvent(String userEmail, BookingRequest request);

	    List<BookingResponse> getUserBookings(String userEmail);

	    void cancelBooking(Long bookingId, String userEmail);
	    
	    BookingResponse getBookingById(Long bookingId, String userEmail);
}
