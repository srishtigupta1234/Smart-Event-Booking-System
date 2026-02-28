package com.booking.request;


import java.time.LocalDateTime;

import com.booking.modal.BookingStatus;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class BookingRequest {

    @NotNull
    private Long eventId;

    @NotNull
    @Positive
    private Integer seats;
    
    @NotNull
    private LocalDateTime bookingDate;
    
    private BookingStatus status; 

	public Long getEventId() {
		return eventId;
	}

	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}

	public Integer getSeats() {
		return seats;
	}

	public void setSeats(Integer seats) {
		this.seats = seats;
	}

	public LocalDateTime getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(LocalDateTime bookingDate) {
		this.bookingDate = bookingDate;
	}

	
	public BookingStatus getStatus() {
		return status;
	}

	public void setStatus(BookingStatus status) {
		this.status = status;
	}

	public BookingRequest() {
		super();
	}

	public BookingRequest(@NotNull Long eventId, @NotNull @Positive Integer seats, @NotNull LocalDateTime bookingDate,
			BookingStatus status) {
		super();
		this.eventId = eventId;
		this.seats = seats;
		this.bookingDate = bookingDate;
		this.status = status;
	}

	
    
    
}