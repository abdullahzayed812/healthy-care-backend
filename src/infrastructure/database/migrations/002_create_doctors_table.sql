CREATE TABLE IF NOT EXISTS doctors (
  id              INT PRIMARY KEY, -- same as user ID
  specialization  VARCHAR(100),
  bio             TEXT,

  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);
