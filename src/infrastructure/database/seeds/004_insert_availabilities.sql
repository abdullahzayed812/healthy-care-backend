-- Availabilities

-- Dr. Smith (id: 2)
INSERT INTO availabilities (id, doctor_id, day_of_week, start_time, end_time, available, booked, created_at, updated_at) VALUES
('a13', 2, 1, '09:00', '09:30', TRUE, FALSE, NOW(), NOW()),
('a14', 2, 2, '10:00', '10:30', TRUE, FALSE, NOW(), NOW()),
('a15', 2, 3, '11:00', '11:30', TRUE, FALSE, NOW(), NOW()),
('a16', 2, 4, '13:00', '13:30', TRUE, FALSE, NOW(), NOW()),
('a17', 2, 5, '14:00', '14:30', FALSE, TRUE, NOW(), NOW()),  -- matched with appointment
('a38', 2, 2, '15:00', '15:30', FALSE, TRUE, NOW(), NOW()),  -- matched with appointment

-- Dr. Jones (id: 3)
('a18', 3, 1, '09:00', '09:30', TRUE, FALSE, NOW(), NOW()),
('a19', 3, 2, '10:00', '10:30', FALSE, TRUE, NOW(), NOW()),  -- matched
('a20', 3, 3, '11:00', '11:30', TRUE, FALSE, NOW(), NOW()),
('a21', 3, 4, '13:00', '13:30', TRUE, FALSE, NOW(), NOW()),
('a22', 3, 5, '14:00', '14:30', TRUE, FALSE, NOW(), NOW()),
('a39', 3, 3, '16:00', '16:30', TRUE, FALSE, NOW(), NOW()),

-- Dr. Lee (id: 4)
('a23', 4, 1, '08:00', '08:30', TRUE, FALSE, NOW(), NOW()),
('a24', 4, 2, '09:00', '09:30', TRUE, FALSE, NOW(), NOW()),
('a25', 4, 3, '10:00', '10:30', TRUE, FALSE, NOW(), NOW()),
('a26', 4, 4, '11:00', '11:30', TRUE, FALSE, NOW(), NOW()),
('a27', 4, 5, '12:00', '12:30', TRUE, FALSE, NOW(), NOW()),
('a40', 4, 4, '08:00', '08:30', FALSE, TRUE, NOW(), NOW()),  -- matched

-- Dr. Khan (id: 5)
('a28', 5, 1, '09:00', '09:30', TRUE, FALSE, NOW(), NOW()),
('a29', 5, 2, '10:00', '10:30', TRUE, FALSE, NOW(), NOW()),
('a30', 5, 3, '11:00', '11:30', TRUE, FALSE, NOW(), NOW()),
('a31', 5, 4, '13:00', '13:30', FALSE, TRUE, NOW(), NOW()),  -- matched
('a32', 5, 5, '14:00', '14:30', TRUE, FALSE, NOW(), NOW()),
('a41', 5, 5, '09:00', '09:30', FALSE, TRUE, NOW(), NOW()),  -- matched

-- Dr. White (id: 6)
('a33', 6, 1, '08:00', '08:30', TRUE, FALSE, NOW(), NOW()),
('a34', 6, 2, '09:00', '09:30', TRUE, FALSE, NOW(), NOW()),
('a35', 6, 3, '10:00', '10:30', TRUE, FALSE, NOW(), NOW()),
('a36', 6, 4, '11:00', '11:30', TRUE, FALSE, NOW(), NOW()),
('a37', 6, 5, '12:00', '12:30', TRUE, FALSE, NOW(), NOW()),
('a42', 6, 1, '10:00', '10:30', FALSE, TRUE, NOW(), NOW());  -- matched
