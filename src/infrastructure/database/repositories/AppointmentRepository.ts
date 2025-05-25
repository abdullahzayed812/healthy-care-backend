import { Appointment } from "../../../core/entities/Appointment";
import { IAppointmentRepository } from "../../../core/interfaces/repositories/IAppointmentRepository";
import { DatabaseError } from "../../../utils/errors/DatabaseErrors";
import { MySqlConnection } from "../connections/MySqlConnection";

export class AppointmentRepository implements IAppointmentRepository {
  constructor(private db: MySqlConnection) {}

  async findAll(): Promise<Appointment[] | null> {
    try {
      const result = await this.db.query<Appointment[]>("SELECT * FROM appointments");

      if (!result.length) return null;

      return result.map(
        (appointment) =>
          new Appointment(
            appointment.id,
            appointment.doctorId,
            appointment.patientId,
            appointment.startTime,
            appointment.endTime,
            appointment.dayOfWeek,
            appointment.reason,
            appointment.status,
            appointment.createdAt,
            appointment.updatedAt
          )
      );
    } catch (error) {
      console.error("Error find all appointment:", error);
      throw new DatabaseError("Failed to find all appointment", "FIND_ALL_APPOINTMENT_DB_ERROR");
    }
  }

  async findById(id: number): Promise<Appointment | null> {
    try {
      const result = await this.db.query<Appointment[]>("SELECT * FROM appointments WHERE id = ?", [id]);

      if (!result.length) return null;

      const appointment = result[0];

      return new Appointment(
        appointment.id,
        appointment.doctorId,
        appointment.patientId,
        appointment.startTime,
        appointment.endTime,
        appointment.dayOfWeek,
        appointment.reason,
        appointment.status,
        appointment.createdAt,
        appointment.updatedAt
      );
    } catch (error) {
      console.error("Error find appointment by id:", error);
      throw new DatabaseError("Failed to find appointment by id", "FIND_APPOINTMENT_BY_ID_DB_ERROR");
    }
  }

  async findByDoctorId(doctorId: number): Promise<Appointment[] | null> {
    try {
      const result = await this.db.query<any[]>("SELECT * FROM appointments WHERE doctor_id = ?", [doctorId]);

      if (!result.length) return null;

      return result.map(
        (appointment) =>
          new Appointment(
            appointment.id,
            appointment.doctor_id,
            appointment.patient_id,
            appointment.startTime,
            appointment.endTime,
            appointment.dayOfWeek,
            appointment.reason,
            appointment.status
          )
      );
    } catch (error) {
      console.error("Error find appointment by doctor id:", error);
      throw new DatabaseError("Failed to find appointment by doctor id", "FIND_APPOINTMENT_BY_DOCTOR_ID_DB_ERROR");
    }
  }

  async findByPatientId(patientId: number): Promise<Appointment[] | null> {
    try {
      const result = await this.db.query<any[]>("SELECT * FROM appointments WHERE patient_id = ?", [patientId]);

      if (!result.length) return null;

      return result.map(
        (appointment) =>
          new Appointment(
            appointment.id,
            appointment.doctor_id,
            appointment.patient_id,
            appointment.startTime,
            appointment.endTime,
            appointment.dayOfWeek,
            appointment.reason,
            appointment.status
          )
      );
    } catch (error) {
      console.error("Error find appointment by patient id:", error);
      throw new DatabaseError("Failed to find appointment by patient id", "FIND_APPOINTMENT_BY_PATIENT_ID_DB_ERROR");
    }
  }

  async create(appointment: Omit<Appointment, "id" | "createdAt" | "updatedAt">): Promise<Appointment | null> {
    try {
      const result = await this.db.query<any>(
        `INSERT INTO appointments (doctor_id, patient_id, start_time, end_time, day_of_week, reason, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          appointment.doctorId,
          appointment.patientId,
          appointment.startTime,
          appointment.endTime,
          appointment.dayOfWeek,
          appointment.reason,
          appointment.status,
        ]
      );

      const id = result.insertId;

      if (!id) return null;

      return new Appointment(
        id,
        appointment.doctorId,
        appointment.patientId,
        appointment.startTime,
        appointment.endTime,
        appointment.dayOfWeek,
        appointment.reason,
        appointment.status
      );
    } catch (error) {
      console.error("Error create appointment:", error);
      throw new DatabaseError("Failed to create appointment", "CREATE_APPOINTMENT_DB_ERROR");
    }
  }

  async update(id: number, data: Partial<Appointment>): Promise<boolean> {
    const fields = [];
    const params: any[] = [];

    if (data.doctorId !== undefined) {
      fields.push("doctor_id = ?");
      params.push(data.doctorId);
    }
    if (data.patientId !== undefined) {
      fields.push("patient_id = ?");
      params.push(data.patientId);
    }
    if (data.dayOfWeek !== undefined) {
      fields.push("date = ?");
      params.push(data.dayOfWeek);
    }
    if (data.reason !== undefined) {
      fields.push("reason = ?");
      params.push(data.reason);
    }

    fields.push("updated_at = ?");
    params.push(new Date());
    params.push(id);

    try {
      const result = await this.db.query<any>(`UPDATE appointments SET ${fields.join(", ")} WHERE id = ?`, params);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error update appointment:", error);
      throw new DatabaseError("Failed to update appointment", "UPDATE_APPOINTMENT_DB_ERROR");
    }
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query<any>("DELETE FROM appointments WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}
