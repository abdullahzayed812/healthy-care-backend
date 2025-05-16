import { Appointment } from "../../../core/entities/Appointment";
import { IAppointmentRepository } from "../../../core/interfaces/repositories/IAppointmentRepository";
import { MySqlConnection } from "../connections/MySqlConnection";

export class AppointmentRepository implements IAppointmentRepository {
  constructor(private db: MySqlConnection) {}

  async findById(id: number): Promise<Appointment | null> {
    const result = await this.db.query<any[]>("SELECT * FROM appointments WHERE id = ?", [id]);
    if (!result.length) return null;
    const data = result[0];
    return new Appointment(
      data.id,
      data.doctor_id,
      data.patient_id,
      data.date,
      data.reason,
      new Date(data.created_at),
      new Date(data.updated_at)
    );
  }

  async findAll(): Promise<Appointment[]> {
    const result = await this.db.query<any[]>("SELECT * FROM appointments");
    return result.map(
      (r) =>
        new Appointment(
          r.id,
          r.doctor_id,
          r.patient_id,
          r.date,
          r.reason,
          new Date(r.created_at),
          new Date(r.updated_at)
        )
    );
  }

  async create(appointment: Omit<Appointment, "id" | "createdAt" | "updatedAt">): Promise<Appointment> {
    const result = await this.db.query<any>(
      `INSERT INTO appointments (doctor_id, patient_id, date, reason) VALUES (?, ?, ?, ?, ?, ?)`,
      [appointment.doctorId, appointment.patientId, appointment.date, appointment.reason]
    );
    return new Appointment(
      result.insertId,
      appointment.doctorId,
      appointment.patientId,
      appointment.date,
      appointment.reason
    );
  }

  async update(id: number, partial: Partial<Appointment>): Promise<boolean> {
    const fields = [];
    const params: any[] = [];

    if (partial.doctorId !== undefined) {
      fields.push("doctor_id = ?");
      params.push(partial.doctorId);
    }
    if (partial.patientId !== undefined) {
      fields.push("patient_id = ?");
      params.push(partial.patientId);
    }
    if (partial.date !== undefined) {
      fields.push("date = ?");
      params.push(partial.date);
    }
    if (partial.reason !== undefined) {
      fields.push("reason = ?");
      params.push(partial.reason);
    }

    fields.push("updated_at = ?");
    params.push(new Date());
    params.push(id);

    const result = await this.db.query<any>(`UPDATE appointments SET ${fields.join(", ")} WHERE id = ?`, params);
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query<any>("DELETE FROM appointments WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  async findByDoctorId(doctorId: number): Promise<Appointment[]> {
    const result = await this.db.query<any[]>("SELECT * FROM appointments WHERE doctor_id = ?", [doctorId]);
    return result.map(
      (r) =>
        new Appointment(
          r.id,
          r.doctor_id,
          r.patient_id,
          r.date,
          r.reason,
          new Date(r.created_at),
          new Date(r.updated_at)
        )
    );
  }

  async findByPatientId(patientId: number): Promise<Appointment[]> {
    const result = await this.db.query<any[]>("SELECT * FROM appointments WHERE patient_id = ?", [patientId]);
    return result.map(
      (r) =>
        new Appointment(
          r.id,
          r.doctor_id,
          r.patient_id,
          r.date,
          r.reason,
          new Date(r.created_at),
          new Date(r.updated_at)
        )
    );
  }
}
