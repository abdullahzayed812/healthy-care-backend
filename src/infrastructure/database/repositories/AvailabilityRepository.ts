import { MySqlConnection } from "../connections/MySqlConnection";
import { Availability } from "../../../core/entities/Availability";
import { IAvailabilityRepository } from "../../../core/interfaces/repositories/IAvailabilityRepository";
import { CreateAvailabilityRequest } from "../../../core/dto/availability.dto";

export class AvailabilityRepository implements IAvailabilityRepository {
  constructor(private db: MySqlConnection) {}

  async findAll(): Promise<Availability[]> {
    const rows = await this.db.query<any[]>("SELECT * FROM availabilities");
    return rows.map(
      (row) =>
        new Availability(
          row.id,
          row.doctor_id,
          row.day_of_week,
          row.start_time,
          row.end_time,
          new Date(row.created_at),
          new Date(row.updated_at)
        )
    );
  }

  async findById(id: number): Promise<Availability | null> {
    const rows = await this.db.query<any[]>("SELECT * FROM availabilities WHERE id = ?", [id]);
    if (!rows.length) return null;
    const row = rows[0];
    return new Availability(
      row.id,
      row.doctor_id,
      row.day_of_week,
      row.start_time,
      row.end_time,
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findByDoctorId(doctorId: number): Promise<Availability[]> {
    const rows = await this.db.query<any[]>("SELECT * FROM availabilities WHERE doctor_id = ?", [doctorId]);
    return rows.map(
      (row) =>
        new Availability(
          row.id,
          row.doctor_id,
          row.day_of_week,
          row.start_time,
          row.end_time,
          new Date(row.created_at),
          new Date(row.updated_at)
        )
    );
  }

  async create(data: CreateAvailabilityRequest): Promise<Availability> {
    const now = new Date();
    const result = await this.db.query<any>(
      `INSERT INTO availabilities (doctor_id, day_of_week, start_time, end_time, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [data.doctorId, data.dayOfWeek, data.startTime, data.endTime, now, now]
    );
    return new Availability(result.insertId, data.doctorId, data.dayOfWeek, data.startTime, data.endTime, now, now);
  }

  async update(id: number, data: Partial<Availability>): Promise<boolean> {
    const updates: string[] = [];
    const params: any[] = [];

    if (data.dayOfWeek) {
      updates.push("day_of_week = ?");
      params.push(data.dayOfWeek);
    }
    if (data.startTime) {
      updates.push("start_time = ?");
      params.push(data.startTime);
    }
    if (data.endTime) {
      updates.push("end_time = ?");
      params.push(data.endTime);
    }

    updates.push("updated_at = ?");
    params.push(new Date());
    params.push(id);

    const result = await this.db.query<any>(`UPDATE availabilities SET ${updates.join(", ")} WHERE id = ?`, params);
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query<any>("DELETE FROM availabilities WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}
