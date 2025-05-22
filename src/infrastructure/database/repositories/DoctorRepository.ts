import { MySqlConnection } from "../connections/MySqlConnection";
import { Doctor } from "../../../core/entities/Doctor";
import { IDoctorRepository } from "../../../core/interfaces/repositories/IDoctorRepository";

export class DoctorRepository implements IDoctorRepository {
  private dbConnection: MySqlConnection;

  constructor(dbConnection: MySqlConnection) {
    this.dbConnection = dbConnection;
  }

  async findById(id: number): Promise<Doctor | null> {
    const result = await this.dbConnection.query<any[]>("SELECT * FROM doctors WHERE id = ?", [id]);

    if (result.length === 0) {
      return null;
    }

    const doctorData = result[0];
    return new Doctor(
      doctorData.id,
      doctorData.username,
      doctorData.email,
      doctorData.phone_number,
      doctorData.specialization,
      new Date(doctorData.created_at),
      new Date(doctorData.updated_at)
    );
  }

  async findAll(): Promise<Doctor[]> {
    const result = await this.dbConnection.query<any[]>("SELECT * FROM doctors");

    return result.map(
      (doctorData) =>
        new Doctor(
          doctorData.id,
          doctorData.username,
          doctorData.email,
          doctorData.phone_number,
          doctorData.specialization,
          new Date(doctorData.created_at),
          new Date(doctorData.updated_at)
        )
    );
  }

  async create(doctor: Omit<Doctor, "id">): Promise<Doctor> {
    const now = new Date();
    const result = await this.dbConnection.query<any>(
      `INSERT INTO doctors (first_name, last_name, email, phone_number, specialization, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [doctor.username, , doctor.email, doctor.phoneNumber, doctor.specialization, now, now]
    );

    const id = result.insertId;
    return new Doctor(id, doctor.username, doctor.email, doctor.phoneNumber, doctor.specialization, now, now);
  }

  async update(id: number, doctor: Partial<Doctor>): Promise<boolean> {
    const updateFields: string[] = [];
    const params: any[] = [];

    if (doctor.username !== undefined) {
      updateFields.push("last_name = ?");
      params.push(doctor.username);
    }

    if (doctor.email !== undefined) {
      updateFields.push("email = ?");
      params.push(doctor.email);
    }

    if (doctor.phoneNumber !== undefined) {
      updateFields.push("phone_number = ?");
      params.push(doctor.phoneNumber);
    }

    if (doctor.specialization !== undefined) {
      updateFields.push("specialization = ?");
      params.push(doctor.specialization);
    }

    updateFields.push("updated_at = ?");
    params.push(new Date());

    params.push(id);

    const result = await this.dbConnection.query<any>(
      `UPDATE doctors SET ${updateFields.join(", ")} WHERE id = ?`,
      params
    );

    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.dbConnection.query<any>("DELETE FROM doctors WHERE id = ?", [id]);

    return result.affectedRows > 0;
  }

  async findBySpecialization(specialization: string): Promise<Doctor[]> {
    const result = await this.dbConnection.query<any[]>("SELECT * FROM doctors WHERE specialization = ?", [
      specialization,
    ]);

    return result.map(
      (doctorData) =>
        new Doctor(
          doctorData.id,
          doctorData.username,
          doctorData.email,
          doctorData.phone_number,
          doctorData.specialization,
          new Date(doctorData.created_at),
          new Date(doctorData.updated_at)
        )
    );
  }

  async findByEmail(email: string): Promise<Doctor | null> {
    const result = await this.dbConnection.query<any[]>("SELECT * FROM doctors WHERE email = ?", [email]);

    if (result.length === 0) {
      return null;
    }

    const doctorData = result[0];
    return new Doctor(
      doctorData.id,
      doctorData.username,
      doctorData.email,
      doctorData.phone_number,
      doctorData.specialization,
      new Date(doctorData.created_at),
      new Date(doctorData.updated_at)
    );
  }
}
