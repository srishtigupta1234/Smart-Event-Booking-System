package com.booking.service;

import java.util.List;

import com.booking.request.EventRequest;
import com.booking.response.EventResponse;

public interface EventService {
	List<EventResponse> getAllEvents();

	EventResponse getEventById(Long id);

	EventResponse createEvent(EventRequest request);

	EventResponse updateEvent(Long id, EventRequest request);

	void deleteEvent(Long id);

}