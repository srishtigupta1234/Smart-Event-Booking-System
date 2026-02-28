package com.booking.modal;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;


@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String location;
    private LocalDateTime date;
    
    private Integer totalSeats;
    private Integer availableSeats;

    private Integer price;
    private String img;
    
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings;

    
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
	public LocalDateTime getDate() {
		return date;
	}
	public void setDate(LocalDateTime localDateTime) {
		this.date = localDateTime;
	}
	public Integer getTotalSeats() {
		return totalSeats;
	}
	public void setTotalSeats(Integer totalSeats) {
		this.totalSeats = totalSeats;
	}
	public Integer getAvailableSeats() {
		return availableSeats;
	}
	public void setAvailableSeats(Integer availableSeats) {
		this.availableSeats = availableSeats;
	}
	
	public List<Booking> getBookings() {
		return bookings;
	}
	public void setBookings(List<Booking> bookings) {
		this.bookings = bookings;
	}
	
	public Event() {
		super();
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
	public Event(Long id, String title, String description, String location, LocalDateTime date, Integer totalSeats,
			Integer availableSeats, Integer price, String img, List<Booking> bookings) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.location = location;
		this.date = date;
		this.totalSeats = totalSeats;
		this.availableSeats = availableSeats;
		this.price = price;
		this.img = img;
		this.bookings = bookings;
	}
    
    
}