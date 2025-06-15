-- AVAILABILITIES
INSERT INTO availabilities (id, doctor_id, day_of_week, start_time, end_time, available, booked) VALUES
('a1', 2, 1, '09:00', '12:00', TRUE, FALSE),
('a2', 2, 3, '13:00', '15:00', TRUE, FALSE),
('a3', 3, 2, '10:00', '12:00', TRUE, FALSE),
('a4', 4, 4, '14:00', '16:00', TRUE, FALSE),
('a5', 5, 5, '09:00', '11:00', TRUE, TRUE),
('a6', 6, 1, '08:00', '10:00', TRUE, FALSE),
('a7', 3, 5, '11:00', '13:00', TRUE, TRUE),
('a8', 4, 3, '15:00', '17:00', TRUE, FALSE),
('a9', 5, 2, '10:00', '12:00', TRUE, FALSE),
('a10', 6, 4, '09:00', '11:00', TRUE, FALSE),
('a11', 2, 5, '13:00', '15:00', TRUE, FALSE),
('a12', 6, 3, '10:00', '12:00', TRUE, TRUE);