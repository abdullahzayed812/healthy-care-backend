CREATE TABLE patients (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(100),
  date_of_birth   DATE,
  gender          ENUM('male', 'female', 'other'),
  contact_info    TEXT,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
