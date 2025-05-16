CREATE TABLE medical_records (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  patient_id  INT,
  doctor_id   INT,
  title       VARCHAR(255),
  description TEXT,
  date        DATE,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);
