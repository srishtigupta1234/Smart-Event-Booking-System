package com.booking.response;

import java.time.LocalDateTime;

import com.booking.modal.BookingStatus;

public class BookingResponse {

	private Long bookingId;
	private String eventTitle;
	private Integer seatsBooked;
	private String message;
	private BookingStatus status;

	private LocalDateTime eventDate;
	private String eventLocation;
	private Integer totalAmount;
	private LocalDateTime bookingTime;
	
	public BookingResponse() {

	}

	public Long getBookingId() {
		return bookingId;
	}

	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}

	public String getEventTitle() {
		return eventTitle;
	}

	public void setEventTitle(String eventTitle) {
		this.eventTitle = eventTitle;
	}

	public Integer getSeatsBooked() {
		return seatsBooked;
	}

	public void setSeatsBooked(Integer seatsBooked) {
		this.seatsBooked = seatsBooked;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public BookingStatus getStatus() {
		return status;
	}

	public void setStatus(BookingStatus status) {
		this.status = status;
	}

	public LocalDateTime getEventDate() {
		return eventDate;
	}

	public void setEventDate(LocalDateTime eventDate) {
		this.eventDate = eventDate;
	}

	public String getEventLocation() {
		return eventLocation;
	}

	public void setEventLocation(String eventLocation) {
		this.eventLocation = eventLocation;
	}

	public Integer getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Integer totalAmount) {
		this.totalAmount = totalAmount;
	}

	public LocalDateTime getBookingTime() {
		return bookingTime;
	}

	public void setBookingTime(LocalDateTime bookingTime) {
		this.bookingTime = bookingTime;
	}

	public BookingResponse(Long bookingId, String eventTitle, Integer seatsBooked, String message, BookingStatus status,
			LocalDateTime eventDate, String eventLocation, Integer totalAmount, LocalDateTime bookingTime) {
		super();
		this.bookingId = bookingId;
		this.eventTitle = eventTitle;
		this.seatsBooked = seatsBooked;
		this.message = message;
		this.status = status;
		this.eventDate = eventDate;
		this.eventLocation = eventLocation;
		this.totalAmount = totalAmount;
		this.bookingTime = bookingTime;
	}

	

}