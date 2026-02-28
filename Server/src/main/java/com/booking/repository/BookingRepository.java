package com.booking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.booking.modal.Booking;
import com.booking.modal.User;

import jakarta.transaction.Transactional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
	List<Booking> findByUser(User user);


    @Modifying
    @Transactional
    @Query("DELETE FROM Booking b WHERE b.event.id = :eventId")
    void deleteByEventId(@Param("eventId") Long eventId);

}