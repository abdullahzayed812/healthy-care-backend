CREATE TABLE users (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    email         VARCHAR(100) NOT NULL UNIQUE,
    first_name    VARCHAR(50) NOT NULL,
    last_name     VARCHAR(50) NOT NULL,
    role          ENUM('admin', 'doctor', 'patient') NOT NULL,
    password      VARCHAR(255),
    phone         VARCHAR(20),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
