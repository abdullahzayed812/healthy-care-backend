import { MySqlConnection } from "../connections/MySqlConnection";
import { Availability } from "../../../core/entities/Availability";
import { IAvailabilityRepository } from "../../../core/interfaces/repositories/IAvailabilityRepository";
import {
  CreateAvailabilityRequest,
  CreateBulkAvailabilityRequest,
  CreateBulkAvailabilityResponse,
} from "../../../core/dto/availability.dto";

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
          row.available,
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
      row.available,
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
          row.available,
          new Date(row.created_at),
          new Date(row.updated_at)
        )
    );
  }

  async create(data: CreateAvailabilityRequest): Promise<Availability> {
    const result = await this.db.query<any>(
      `INSERT INTO availabilities (doctor_id, day_of_week, start_time, end_time, available)
       VALUES (?, ?, ?, ?, ?)`,
      [data.doctorId, data.dayOfWeek, data.startTime, data.endTime, data.available]
    );

    return new Availability(
      result.insertId,
      data.doctorId,
      data.dayOfWeek,
      data.startTime,
      data.endTime,
      data.available
    );
  }

  async createBulk(data: CreateBulkAvailabilityRequest): Promise<CreateBulkAvailabilityResponse> {
    const { doctorId, slots } = data;

    if (slots.length === 0) {
      return {
        success: false,
        message: "No availability data provided.",
        insertedCount: 0,
      };
    }

    return this.db.transaction(async (conn) => {
      const values: any[] = [];
      const placeholders: string[] = [];

      slots.forEach((item) => {
        placeholders.push("(?, ?, ?, ?, ?, ?)");
        values.push(item.id, doctorId, item.dayOfWeek, item.startTime, item.endTime, item.available);
      });

      await conn.execute(
        `INSERT INTO availabilities 
          (id, doctor_id, day_of_week, start_time, end_time, available)
         VALUES ${placeholders.join(", ")}`,
        values
      );

      const insertedCount = slots.length;

      return {
        success: true,
        message: `${insertedCount} availability slots created successfully.`,
        insertedCount,
      };
    });
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

  async deleteByDoctorId(id: number): Promise<boolean> {
    const result = await this.db.query<any>("DELETE FROM availabilities WHERE doctor_id = ?", [id]);
    return result.affectedRows > 0;
  }
}
