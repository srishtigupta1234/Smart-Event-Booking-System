package com.booking.service;

import com.booking.modal.User;

public interface UserService {

    User getCurrentUser(String email);

}