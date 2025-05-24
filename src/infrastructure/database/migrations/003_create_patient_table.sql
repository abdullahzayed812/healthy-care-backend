CREATE TABLE IF NOT EXISTS patients (
  id              INT PRIMARY KEY, -- same as user ID
  date_of_birth   DATE,
  gender          ENUM('male', 'female', 'child'),

  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);
