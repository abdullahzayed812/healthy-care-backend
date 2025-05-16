import { PatientRecord } from "../../../core/entities/PatientRecord";
import { IPatientRecordRepository } from "../../../core/interfaces/repositories/IPatientRecordRepository";
import { MySqlConnection } from "../connections/MySqlConnection";

export class PatientRecordRepository implements IPatientRecordRepository {
  constructor(private db: MySqlConnection) {}

  async findAll(): Promise<PatientRecord[]> {
    const rows = await this.db.query<any[]>("SELECT * FROM medical_records");
    return rows.map(this.map);
  }

  async findById(id: number): Promise<PatientRecord | null> {
    const rows = await this.db.query<any[]>("SELECT * FROM medical_records WHERE id = ?", [id]);
    return rows.length ? this.map(rows[0]) : null;
  }

  async findByPatientId(patientId: number): Promise<PatientRecord[]> {
    const rows = await this.db.query<any[]>("SELECT * FROM medical_records WHERE patient_id = ?", [patientId]);
    return rows.map(this.map);
  }

  async create(data: Omit<PatientRecord, "id" | "createdAt">): Promise<PatientRecord> {
    const result = await this.db.query<any>(
      "INSERT INTO medical_records (patient_id, doctor_id, title, description, date) VALUES (?, ?, ?, ?, ?)",
      [data.patientId, data.doctorId, data.title, data.description, data.date]
    );
    return new PatientRecord(result.insertId, data.patientId, data.doctorId, data.title, data.description, data.date);
  }

  async update(
    id: number,
    data: Partial<Omit<PatientRecord, "id" | "patientId" | "doctorId" | "createdAt">>
  ): Promise<boolean> {
    const fields: string[] = [];
    const params: any[] = [];

    if (data.title !== undefined) {
      fields.push("title = ?");
      params.push(data.title);
    }

    if (data.description !== undefined) {
      fields.push("description = ?");
      params.push(data.description);
    }

    if (data.date !== undefined) {
      fields.push("date = ?");
      params.push(data.date);
    }

    if (!fields.length) return false; // Nothing to update

    params.push(id);
    const query = `UPDATE medical_records SET ${fields.join(", ")} WHERE id = ?`;
    const result = await this.db.query<any>(query, params);
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.query<any>("DELETE FROM medical_records WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  private map(row: any): PatientRecord {
    return new PatientRecord(
      row.id,
      row.patient_id,
      row.doctor_id,
      row.title,
      row.description,
      row.date,
      new Date(row.created_at)
    );
  }
}
