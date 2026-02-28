# Smart Event Booking System 

This is the backend for the **Smart Event Booking System**, built with **Spring Boot 3.2**, **Spring Security**, **JWT Authentication**, and **MySQL**.
The system allows users to view and book events, while admins can manage events and bookings.

---

## Table of Contents

* [Features](#features)
* [Prerequisites](#prerequisites)
* [Setup Instructions](#setup-instructions)
* [Database Setup](#database-setup)
* [Environment Variables](#environment-variables)
* [Running the Application](#running-the-application)
* [API Endpoints](#api-endpoints)
* [Project Screenshots](#project-screenshots)
* [Database Schema](#database-schema)
* [Notes](#notes)

---

## Features

* **User Authentication & Authorization** (JWT-based)
* **Admin & User Roles**
* **Event Management** (CRUD operations for admin)
* **Booking System** (book, view, and cancel bookings)
* **Secure Passwords** (BCrypt hashing)
* **CORS Configured** for frontend communication

---

## Prerequisites

* **Java 21** or higher
* **Maven 3.8+**
* **MySQL 8+**
* **Postman / Browser** (for API testing)
* **Optional:** Docker (for containerized deployment)

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd Server
```

2. **Build the project**

```bash
mvn clean install
```

3. **Configure Environment Variables**
   For security, do not hardcode credentials.

**Windows (PowerShell)**

```powershell
$Env:DB_USERNAME="root"
$Env:DB_PASSWORD="root"
$Env:JWT_SECRET="mysupersecuresecretkeymysupersecure123"
```

**Linux / MacOS (bash/zsh)**

```bash
export DB_USERNAME=root
export DB_PASSWORD=root
export JWT_SECRET=mysupersecuresecretkeymysupersecure123
```

---

## Database Setup

1. **Create Database**

```sql
CREATE DATABASE smart_event_db;
```

2. **User & Password**

```sql
CREATE USER 'smartuser'@'localhost' IDENTIFIED BY 'smartpassword';
GRANT ALL PRIVILEGES ON smart_event_db.* TO 'smartuser'@'localhost';
FLUSH PRIVILEGES;
```

3. **Schema Generation**

* The application auto-creates tables using:

```properties
spring.jpa.hibernate.ddl-auto=update
```

* Tables created:

| Table Name | Description                                                    |
| ---------- | -------------------------------------------------------------- |
| `user`     | Stores user details (email, password, role)                    |
| `event`    | Stores event information (title, date, location, seats, price) |
| `booking`  | Stores bookings (user, event, seats, total amount, status)     |

---

## Environment Variables

| Variable      | Description                       |
| ------------- | --------------------------------- |
| `DB_USERNAME` | MySQL username                    |
| `DB_PASSWORD` | MySQL password                    |
| `JWT_SECRET`  | Secret key for JWT authentication |

> **Important:** Never commit your secrets to Git.

---

## Running the Application

**Local Run:**

```bash
mvn spring-boot:run
```

**From JAR:**

```bash
java -jar target/server-0.0.1-SNAPSHOT.jar
```

The server will start at: `http://localhost:8080`

---

## API Endpoints

### Auth

* `POST /auth/register` - User registration
* `POST /auth/login` - User login (returns JWT)

### Events

* `GET /events` - Get all events (public)
* `GET /events/{id}` - Get event by ID (public)
* `POST /events` - Create event (Admin only)
* `PUT /events/{id}` - Update event (Admin only)
* `DELETE /events/{id}` - Delete event (Admin only)

### Bookings

* `POST /bookings` - Book an event (Authenticated)
* `GET /bookings` - Get user bookings (Authenticated)
* `GET /bookings/{id}` - Get booking by ID (Authenticated)
* `DELETE /bookings/{id}` - Cancel booking (Authenticated)

> JWT token must be included in `Authorization: Bearer <token>` header for protected routes.

---

## Database Schema

**Tables and Columns:**

### `user` Table

| Column     | Type                 | Description      |
| ---------- | -------------------- | ---------------- |
| `id`       | BIGINT (PK, AI)      | Primary key      |
| `name`     | VARCHAR(255)         | User's name      |
| `email`    | VARCHAR(255, UNIQUE) | User's email     |
| `password` | VARCHAR(255)         | Hashed password  |
| `role`     | ENUM('USER','ADMIN') | Role of the user |

### `event` Table

| Column            | Type            | Description         |
| ----------------- | --------------- | ------------------- |
| `id`              | BIGINT (PK, AI) | Primary key         |
| `title`           | VARCHAR(255)    | Event title         |
| `description`     | VARCHAR(255)    | Event description   |
| `date`            | DATETIME        | Event date and time |
| `location`        | VARCHAR(255)    | Event location      |
| `available_seats` | INT             | Seats available     |
| `total_seats`     | INT             | Total seats         |
| `price`           | INT             | Ticket price        |
| `img`             | VARCHAR(255)    | Event image URL     |

### `booking` Table

| Column         | Type                          | Description            |
| -------------- | ----------------------------- | ---------------------- |
| `id`           | BIGINT (PK, AI)               | Primary key            |
| `user_id`      | BIGINT (FK)                   | References `user.id`   |
| `event_id`     | BIGINT (FK)                   | References `event.id`  |
| `seats`        | INT                           | Number of seats booked |
| `total_amount` | INT                           | Total booking amount   |
| `status`       | ENUM('confirmed','cancelled') | Booking status         |
| `booking_date` | DATETIME                      | Booking timestamp      |

---

## Project Screenshots 
<details>
  <summary><b>Click to expand screenshots</b></summary>
  <br>
  
  ![Login Page](https://raw.githubusercontent.com/srishtigupta1234/Smart-Event-Booking-System/main/client/src/assets/Screenshot%202026-02-28%20222611.png)
  ![Registration](https://raw.githubusercontent.com/srishtigupta1234/Smart-Event-Booking-System/main/client/src/assets/Screenshot%202026-02-28%20222625.png)
  ![Event Dashboard](https://raw.githubusercontent.com/srishtigupta1234/Smart-Event-Booking-System/main/client/src/assets/Screenshot%202026-02-28%20222640.png)
  ![Event Details](https://raw.githubusercontent.com/srishtigupta1234/Smart-Event-Booking-System/main/client/src/assets/Screenshot%202026-02-28%20222710.png
  ![Booking Confirmation](https://raw.githubusercontent.com/srishtigupta1234/Smart-Event-Booking-System/main/client/src/assets/Screenshot%202026-02-28%20222746.png)
  ![User Bookings](https://raw.githubusercontent.com/srishtigupta1234/Smart-Event-Booking-System/main/client/src/assets/Screenshot%202026-02-28%20222814.png)

</details>

## Notes

* **CORS** is configured for `http://localhost:5173`. Update `SecurityConfig` if frontend URL changes.
* For production, use **Docker** or a **Cloud provider**.
* Always use **HTTPS** in production for security.

