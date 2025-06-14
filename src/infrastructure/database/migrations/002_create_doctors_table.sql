CREATE TABLE IF NOT EXISTS doctors (
  id              INT PRIMARY KEY, -- same as user ID
  specialty       VARCHAR(100),
  bio             TEXT,
  experience      INT NOT NULL DEFAULT 5,
  reviews         INT NOT NULL DEFAULT 0,

  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);
