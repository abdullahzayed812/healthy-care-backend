import { databaseConfig } from "../config/database";
import { MySqlConnection } from "../infrastructure/database/connections/MySqlConnection";
import { DatabaseManager } from "../infrastructure/database/DatabaseManager";
import { AppointmentRepository } from "../infrastructure/database/repositories/AppointmentRepository";
import { UserRepository } from "../infrastructure/database/repositories/UserRepository";
import { AvailabilityRepository } from "../infrastructure/database/repositories/AvailabilityRepository";
import { DoctorRepository } from "../infrastructure/database/repositories/DoctorRepository";
import { PatientRecordRepository } from "../infrastructure/database/repositories/PatientRecordRepository";
import { PatientRepository } from "../infrastructure/database/repositories/PatientRepository";
import { AppointmentService } from "../infrastructure/services/AppointmentService";
import { AuthService } from "../infrastructure/services/AuthService";
import { AvailabilityService } from "../infrastructure/services/AvailabilityService";
import { DoctorService } from "../infrastructure/services/DoctorService";
import { PatientRecordService } from "../infrastructure/services/PatientRecordService";
import { PatientService } from "../infrastructure/services/PatientService";
import { UserService } from "../infrastructure/services/UserService";

const dbConnection = MySqlConnection.getInstance(databaseConfig);

export const container = {
  doctorService: new DoctorService(new DoctorRepository(dbConnection)),
  patientService: new PatientService(new PatientRepository(dbConnection)),
  authService: new AuthService(new UserRepository(dbConnection)),
  appointmentService: new AppointmentService(new AppointmentRepository(dbConnection)),
  patientRecordService: new PatientRecordService(new PatientRecordRepository(dbConnection)),
  availabilityService: new AvailabilityService(new AvailabilityRepository(dbConnection)),
  userService: new UserService(new UserRepository(dbConnection)),

  dbManager: new DatabaseManager(dbConnection),
};
