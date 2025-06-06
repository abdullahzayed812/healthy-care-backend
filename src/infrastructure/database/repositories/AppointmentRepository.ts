import { CreateAppointmentRequest } from "../../../core/dto/appointment.dto";
import { Appointment } from "../../../core/entities/Appointment";
import { IAppointmentRepository } from "../../../core/interfaces/repositories/IAppointmentRepository";
import { DatabaseError } from "../../../utils/errors/DatabaseErrors";
import { MySqlConnection } from "../connections/MySqlConnection";

export class AppointmentRepository implements IAppointmentRepository {
  constructor(private db: MySqlConnection) {}

  async findAll(): Promise<Appointment[] | null> {
    try {
      const result = await this.db.query<any[]>("SELECT * FROM appointments");

      if (!result.length) return null;

      return result.map(
        (appointment) =>
          new Appointment(
            appointment.id,
            appointment.doctor_id,
            appointment.patient_id,
            appointment.day_of_week,
            appointment.start_time,
            appointment.end_time,
            appointment.reason,
            appointment.status,
            appointment.created_at,
            appointment.updated_at
          )
      );
    } catch (error) {
      console.error("Error find all appointment:", error);
      throw new DatabaseError("Failed to find all appointment", "FIND_ALL_APPOINTMENT_DB_ERROR");
    }
  }
  async findAllWithRelations(): Promise<any[] | null> {
    try {
      const result = await this.db.query<any[]>(
        `
        SELECT 
          a.id AS appointment_id,
          a.day_of_week,
          a.start_time,
          a.end_time,
          a.reason,
          a.status,
          a.date,
  
          d.id AS doctor_id,
          d.specialty,
          d.bio,
          d.experience,
          d.reviews,
          u_doctor.email AS doctor_email,
          u_doctor.username AS doctor_username,
          u_doctor.phone_number AS doctor_phone,
  
          p.id AS patient_id,
          p.date_of_birth,
          p.gender,
          u_patient.email AS patient_email,
          u_patient.username AS patient_username,
          u_patient.phone_number AS patient_phone
  
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.id
        JOIN users u_doctor ON d.id = u_doctor.id
  
        JOIN patients p ON a.patient_id = p.id
        JOIN users u_patient ON p.id = u_patient.id
        `
      );

      if (!result.length) return null;

      return result.map((row) => ({
        appointment: {
          id: row.appointment_id,
          dayOfWeek: row.day_of_week,
          startTime: row.start_time,
          endTime: row.end_time,
          date: row.date,
          reason: row.reason,
          status: row.status,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        },
        doctor: {
          id: row.doctor_id,
          email: row.doctor_email,
          username: row.doctor_username,
          phone: row.doctor_phone,
          specialty: row.specialty,
          bio: row.bio,
          experience: row.experience,
          reviews: row.reviews,
        },
        patient: {
          id: row.patient_id,
          email: row.patient_email,
          username: row.patient_username,
          phone: row.patient_phone,
          dateOfBirth: row.date_of_birth,
          gender: row.gender,
        },
      }));
    } catch (error) {
      console.error("Error fetching appointments with full user data:", error);
      throw new DatabaseError(
        "Failed to fetch appointments with related user data",
        "FIND_ALL_WITH_RELATIONS_DB_ERROR"
      );
    }
  }

  async findById(id: number): Promise<Appointment | null> {
    try {
      const result = await this.db.query<any[]>("SELECT * FROM appointments WHERE id = ?", [id]);

      if (!result.length) return null;

      const appointment = result[0];

      return new Appointment(
        appointment.id,
        appointment.doctor_id,
        appointment.patient_id,
        appointment.day_of_week,
        appointment.start_time,
        appointment.end_time,
        appointment.reason,
        appointment.status,
        appointment.created_at,
        appointment.updated_at
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
            appointment.day_of_week,
            appointment.start_time,
            appointment.end_time,
            appointment.date,
            appointment.reason,
            appointment.status,
            appointment.created_at,
            appointment.updated_at
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
            appointment.day_of_week,
            appointment.start_time,
            appointment.end_time,
            appointment.reason,
            appointment.status,
            appointment.created_at,
            appointment.updated_at
          )
      );
    } catch (error) {
      console.error("Error find appointment by patient id:", error);
      throw new DatabaseError("Failed to find appointment by patient id", "FIND_APPOINTMENT_BY_PATIENT_ID_DB_ERROR");
    }
  }

  async create(appointment: CreateAppointmentRequest): Promise<Appointment | null> {
    const { doctorId, patientId, reason, dayOfWeek, startTime, endTime, date, status } = appointment;

    try {
      return this.db.transaction(async (connection) => {
        // Check availability
        const [availabilityRows] = await connection.query(
          `
          SELECT * FROM availabilities
          WHERE doctor_id = ? AND day_of_week = ? AND available = TRUE
          AND start_time <= ? AND end_time >= ?`,
          [doctorId, dayOfWeek, startTime, endTime]
        );

        if ((availabilityRows as any[]).length === 0) {
          throw new DatabaseError("Doctor is not available at the requested time", "CREATE_APPOINTMENT_DB_ERROR");
        }

        // Check for overlapping appointment
        const [appointmentRows] = await connection.query(
          `
          SELECT * FROM appointments
          WHERE doctor_id = ? AND day_of_week = ?
          AND NOT (end_time <= ? OR start_time >= ?)`,
          [doctorId, dayOfWeek, startTime, endTime]
        );

        if ((appointmentRows as any[]).length > 0) {
          throw new DatabaseError("This time slot is already booked", "CREATE_APPOINTMENT_DB_ERROR");
        }

        // Insert new appointment
        const [result] = await connection.query<any>(
          `
          INSERT INTO appointments (doctor_id, patient_id, reason, day_of_week, start_time, end_time, date)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [doctorId, patientId, reason, dayOfWeek, startTime, endTime, date]
        );

        const id = result.insertId;

        if (!id) return null;

        return new Appointment(
          id,
          appointment.doctorId,
          appointment.patientId,
          appointment.dayOfWeek,
          appointment.startTime,
          appointment.endTime,
          appointment.date,
          appointment.reason,
          appointment.status
        );
      });
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
