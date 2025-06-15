-- APPOINTMENTS
INSERT INTO appointments (doctor_id, patient_id, reason, day_of_week, start_time, end_time, date, status) VALUES
(2, 7, 'Heart checkup', 1, '09:00', '09:30', '2025-06-17', 'scheduled'),
(3, 8, 'Skin rash', 2, '10:00', '10:30', '2025-06-18', 'pending'),
(4, 9, 'Headache issues', 4, '14:00', '14:30', '2025-06-19', 'completed'),
(5, 10, 'Child vaccination', 5, '09:00', '09:30', '2025-06-20', 'scheduled'),
(6, 11, 'Knee pain', 1, '08:00', '08:30', '2025-06-21', 'pending'),
(3, 12, 'Acne treatment', 5, '11:00', '11:30', '2025-06-22', 'scheduled'),
(4, 13, 'Child sleep problems', 3, '15:00', '15:30', '2025-06-23', 'cancelled'),
(2, 14, 'High blood pressure', 5, '13:00', '13:30', '2025-06-24', 'completed'),
(6, 7, 'Back pain', 4, '09:00', '09:30', '2025-06-25', 'scheduled'),
(5, 8, 'Child allergy', 2, '10:00', '10:30', '2025-06-26', 'pending');