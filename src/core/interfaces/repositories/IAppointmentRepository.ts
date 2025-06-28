import { CreateAppointmentRequest, IGetAppointmentsWithDoctorDate } from "../../dto/appointment.dto";
import { Appointment, AppointmentStatus } from "../../entities/Appointment";

export interface IAppointmentRepository {
  findAll(): Promise<Appointment[] | null>;
  findAllWithRelations(): Promise<any[] | null>;
  findById(id: number): Promise<Appointment | null>;
  findByDoctorId(doctorId: number): Promise<IGetAppointmentsWithDoctorDate[] | null>;
  findByPatientId(patientId: number): Promise<IGetAppointmentsWithDoctorDate[] | null>;
  create(appointment: CreateAppointmentRequest): Promise<Appointment | null>;
  update(id: number, data: Partial<Appointment>): Promise<boolean>;
  updateStatus(id: number, status: AppointmentStatus): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
