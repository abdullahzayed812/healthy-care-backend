import { Appointment, AppointmentStatus } from "../../core/entities/Appointment";
import { IAppointmentRepository } from "../../core/interfaces/repositories/IAppointmentRepository";
import {
  CreateAppointmentRequest,
  IGetAppointmentsWithDoctorDate,
  UpdateAppointmentRequest,
} from "../../core/dto/appointment.dto";

export class AppointmentService {
  constructor(private appointmentRepo: IAppointmentRepository) {}

  async getAll(): Promise<Appointment[] | null> {
    return this.appointmentRepo.findAll();
  }

  async getAllWithRelations(): Promise<any[] | null> {
    return this.appointmentRepo.findAllWithRelations();
  }

  async getById(id: number): Promise<Appointment | null> {
    return this.appointmentRepo.findById(id);
  }

  async findByDoctorId(doctorId: number): Promise<IGetAppointmentsWithDoctorDate[] | null> {
    return this.appointmentRepo.findByDoctorId(doctorId);
  }

  async findByPatientId(patientId: number): Promise<IGetAppointmentsWithDoctorDate[] | null> {
    return this.appointmentRepo.findByPatientId(patientId);
  }

  async create(data: CreateAppointmentRequest): Promise<Appointment | null> {
    return this.appointmentRepo.create(data);
  }

  async update(id: number, data: UpdateAppointmentRequest): Promise<boolean> {
    return this.appointmentRepo.update(id, data as Partial<Appointment>);
  }

  async updateStatus(id: number, status?: AppointmentStatus): Promise<boolean> {
    if (!status) return false;
    return this.appointmentRepo.updateStatus(id, status);
  }

  async delete(id: number): Promise<boolean> {
    return this.appointmentRepo.delete(id);
  }
}
