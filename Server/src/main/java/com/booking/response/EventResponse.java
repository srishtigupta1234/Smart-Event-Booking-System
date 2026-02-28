package com.booking.response;

import java.time.LocalDateTime;

public class EventResponse {

	private Long id;
	private String title;
	private String description;
	private String location;
	private LocalDateTime date;
	private Integer availableSeats;
	private Integer totalSeats;
	private Integer price;
	private String img;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public Integer getAvailableSeats() {
		return availableSeats;
	}

	public void setAvailableSeats(Integer availableSeats) {
		this.availableSeats = availableSeats;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public EventResponse() {
		super();
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

	public EventResponse(Long id, String title, String description, String location, LocalDateTime date,
			Integer availableSeats, Integer totalSeats, Integer price, String img) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.location = location;
		this.date = date;
		this.availableSeats = availableSeats;
		this.totalSeats = totalSeats;
		this.price = price;
		this.img = img;
	}

}