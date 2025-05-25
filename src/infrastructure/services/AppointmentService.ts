import { Appointment } from "../../core/entities/Appointment";
import { IAppointmentRepository } from "../../core/interfaces/repositories/IAppointmentRepository";
import { CreateAppointmentRequest, UpdateAppointmentRequest } from "../../core/dto/appointment.dto";

export class AppointmentService {
  constructor(private appointmentRepo: IAppointmentRepository) {}

  async getAll(): Promise<Appointment[] | null> {
    return this.appointmentRepo.findAll();
  }

  async getById(id: number): Promise<Appointment | null> {
    return this.appointmentRepo.findById(id);
  }

  async findByDoctorId(doctorId: number): Promise<Appointment[] | null> {
    return this.appointmentRepo.findByDoctorId(doctorId);
  }

  async findByPatientId(patientId: number): Promise<Appointment[] | null> {
    return this.appointmentRepo.findByPatientId(patientId);
  }

  async create(data: CreateAppointmentRequest): Promise<Appointment | null> {
    return this.appointmentRepo.create(data);
  }

  async update(id: number, data: UpdateAppointmentRequest): Promise<boolean> {
    return this.appointmentRepo.update(id, data as Partial<Appointment>);
  }

  async delete(id: number): Promise<boolean> {
    return this.appointmentRepo.delete(id);
  }
}
