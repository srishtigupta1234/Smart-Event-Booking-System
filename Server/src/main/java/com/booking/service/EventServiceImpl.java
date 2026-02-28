package com.booking.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.booking.modal.Event;
import com.booking.repository.BookingRepository;
import com.booking.repository.EventRepository;
import com.booking.request.EventRequest;
import com.booking.response.EventResponse;

import jakarta.transaction.Transactional;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final BookingRepository bookingRepository;

    public EventServiceImpl(EventRepository eventRepository, BookingRepository bookingRepository) {
        this.eventRepository = eventRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public List<EventResponse> getAllEvents() {
        return eventRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public EventResponse createEvent(EventRequest request) {
        // Validation
        if (request.getTotalSeats() <= 0) {
            throw new IllegalArgumentException("Total seats must be greater than zero");
        }
        if (request.getDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Event date must be in the future");
        }

        Event event = new Event();
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setLocation(request.getLocation());
        event.setDate(request.getDate());
        event.setTotalSeats(request.getTotalSeats());
        event.setAvailableSeats(request.getTotalSeats());
        event.setPrice(request.getPrice());
        event.setImg(request.getImg());

        Event saved = eventRepository.save(event);
        return mapToResponse(saved);
    }

    @Override
    public EventResponse getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Event not found"));
        return mapToResponse(event);
    }

    @Override
    public EventResponse updateEvent(Long id, EventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Event not found"));

        if (request.getTotalSeats() <= 0) {
            throw new IllegalArgumentException("Total seats must be greater than zero");
        }

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setLocation(request.getLocation());
        event.setDate(request.getDate());

        int seatDifference = request.getTotalSeats() - event.getTotalSeats();
        event.setTotalSeats(request.getTotalSeats());
        event.setAvailableSeats(event.getAvailableSeats() + seatDifference);

        event.setPrice(request.getPrice());
        event.setImg(request.getImg());

        Event updated = eventRepository.save(event);
        return mapToResponse(updated);
    }

    @Override
    @Transactional
    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Event not found"));

      
        bookingRepository.deleteByEventId(event.getId());
        eventRepository.delete(event);
    }

   
    private EventResponse mapToResponse(Event event) {
        return new EventResponse(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getLocation(),
                event.getDate(),
                event.getAvailableSeats(),
                event.getTotalSeats(),
                event.getPrice(),
                event.getImg()
        );
    }
}