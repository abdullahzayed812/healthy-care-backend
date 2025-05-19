CREATE TABLE IF NOT EXISTS availabilities (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  doctor_id   INT NOT NULL,
  day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
  start_time  TIME NOT NULL,
  end_time    TIME NOT NULL,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);
