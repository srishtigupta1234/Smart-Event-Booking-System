package com.booking.request;


import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class EventRequest {
	@NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private String location;

    @NotNull(message = "Event date is required")
    @Future(message = "Event date must be in the future")
    private LocalDateTime date;

    @NotNull
    @Positive
    private Integer totalSeats;

    private Integer price;

    private String img;

    
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public Integer getTotalSeats() {
		return totalSeats;
	}

	public void setTotalSeats(Integer totalSeats) {
		this.totalSeats = totalSeats;
	}

	
	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public EventRequest() {
		super();
	}

	public EventRequest(@NotBlank String title, @NotBlank String description, @NotBlank String location,
			@NotNull(message = "Event date is required") @Future(message = "Event date must be in the future") LocalDateTime date,
			@NotNull @Positive Integer totalSeats, Integer price, String img) {
		super();
		this.title = title;
		this.description = description;
		this.location = location;
		this.date = date;
		this.totalSeats = totalSeats;
		this.price = price;
		this.img = img;
	}
    
    
}