package com.booking.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.booking.request.BookingRequest;
import com.booking.response.BookingResponse;
import com.booking.service.BookingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/bookings")
@PreAuthorize("hasAnyRole('USER','ADMIN')")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<BookingResponse> bookEvent(
            @Valid @RequestBody BookingRequest request,
            Principal principal) {

        return ResponseEntity.ok(
                bookingService.bookEvent(principal.getName(), request)
        );
    }

    @GetMapping
    public ResponseEntity<List<BookingResponse>> getUserBookings(
            Principal principal) {

        return ResponseEntity.ok(
                bookingService.getUserBookings(principal.getName())
        );
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<String> cancelBooking(
            @PathVariable Long bookingId,
            Principal principal) {

        bookingService.cancelBooking(bookingId, principal.getName());
        return ResponseEntity.ok("Booking cancelled successfully");
    }
    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingResponse> getBookingById(
            @PathVariable Long bookingId,
            Principal principal) {

        return ResponseEntity.ok(
                bookingService.getBookingById(bookingId, principal.getName())
        );
    }
}
