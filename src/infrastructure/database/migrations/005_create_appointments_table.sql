CREATE TABLE IF NOT EXISTS appointments (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  doctor_id         INT NOT NULL,
  patient_id        INT NOT NULL,
  reason            TEXT NOT NULL,
  day_of_week       INT NOT NULL,
  start_time        VARCHAR(5) NOT NULL,
  end_time          VARCHAR(5) NOT NULL,
  status            ENUM('pending', 'scheduled', 'completed', 'cancelled') DEFAULT 'pending',

  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);
