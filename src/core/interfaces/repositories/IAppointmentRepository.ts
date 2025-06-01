import { CreateAppointmentRequest } from "../../dto/appointment.dto";
import { Appointment } from "../../entities/Appointment";
import { IRepository } from "./IRepository";

export interface IAppointmentRepository {
  findAll(): Promise<Appointment[] | null>;
  findById(id: number): Promise<Appointment | null>;
  findByDoctorId(doctorId: number): Promise<Appointment[] | null>;
  findByPatientId(patientId: number): Promise<Appointment[] | null>;
  create(appointment: CreateAppointmentRequest): Promise<Appointment | null>;
  update(id: number, data: Partial<Appointment>): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
