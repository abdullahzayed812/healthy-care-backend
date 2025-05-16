CREATE TABLE availabilities (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  doctor_id   INT NOT NULL,
  day_of_week VARCHAR(10) NOT NULL, -- e.g., Monday, Tuesday
  start_time  TIME NOT NULL,
  end_time    TIME NOT NULL,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);
