package com.booking.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import com.booking.modal.Booking;
import com.booking.modal.BookingStatus;
import com.booking.modal.Event;
import com.booking.modal.User;
import com.booking.repository.BookingRepository;
import com.booking.repository.EventRepository;
import com.booking.repository.UserRepository;
import com.booking.request.BookingRequest;
import com.booking.response.BookingResponse;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public BookingServiceImpl(BookingRepository bookingRepository,
                              EventRepository eventRepository,
                              UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Override
    public BookingResponse bookEvent(String userEmail, BookingRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        Event event = eventRepository.findByIdForUpdate(request.getEventId())
                .orElseThrow(() -> new IllegalStateException("Event not found"));

        if (request.getSeats() <= 0)
            throw new IllegalArgumentException("Seats must be greater than zero");

        if (event.getAvailableSeats() < request.getSeats())
            throw new IllegalStateException("Not enough seats available");

        event.setAvailableSeats(event.getAvailableSeats() - request.getSeats());

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setEvent(event);
        booking.setSeats(request.getSeats());
        booking.setTotalAmount(request.getSeats() * event.getPrice());
        booking.setBookingDate(LocalDateTime.now());
        booking.setStatus(BookingStatus.confirmed);

        Booking saved = bookingRepository.save(booking);

        return new BookingResponse(
            saved.getId(),
            event.getTitle(),
            saved.getSeats(),
            "Event booked successfully",
            saved.getStatus(),
            event.getDate(),
            event.getLocation(),
            saved.getTotalAmount(),
            saved.getBookingDate()
        );
    }

    @Override
    public List<BookingResponse> getUserBookings(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        return bookingRepository.findByUser(user)
                .stream()
                .map(b -> new BookingResponse(
                        b.getId(),
                        b.getEvent().getTitle(),
                        b.getSeats(),
                        "Booking retrieved",
                        b.getStatus(),
                        b.getEvent().getDate(),
                        b.getEvent().getLocation(),
                        b.getSeats() * b.getEvent().getPrice(),
                        b.getBookingDate()
                ))
                .toList();
    }

    @Override
    public void cancelBooking(Long bookingId, String userEmail) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalStateException("Booking not found"));

        if (!booking.getUser().getEmail().equals(userEmail))
            throw new IllegalStateException("Unauthorized cancellation attempt");

        Event event = eventRepository.findByIdForUpdate(booking.getEvent().getId())
                .orElseThrow(() -> new IllegalStateException("Event not found"));

        event.setAvailableSeats(event.getAvailableSeats() + booking.getSeats());

        booking.setStatus(BookingStatus.cancelled);
        bookingRepository.save(booking);
    }

    @Override
    public BookingResponse getBookingById(Long bookingId, String userEmail) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalStateException("Booking not found"));

        if (!booking.getUser().getEmail().equals(userEmail))
            throw new IllegalStateException("Unauthorized access");

        Event event = booking.getEvent();

        return new BookingResponse(
                booking.getId(),
                event.getTitle(),
                booking.getSeats(),
                "Booking details",
                booking.getStatus(),
                event.getDate(),                   // eventDate
                event.getLocation(),               // eventLocation
                booking.getSeats() * event.getPrice(), // totalAmount
                booking.getBookingDate()           // bookingTime
        );
    }
}