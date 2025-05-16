import { Appointment } from "../../entities/Appointment";
import { IRepository } from "./IRepository";

export interface IAppointmentRepository extends IRepository<Appointment> {
  findByDoctorId(doctorId: number): Promise<Appointment[]>;
  findByPatientId(patientId: number): Promise<Appointment[]>;
}
