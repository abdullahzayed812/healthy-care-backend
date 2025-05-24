import { MySqlConnection } from "../connections/MySqlConnection";
import { Doctor } from "../../../core/entities/Doctor";
import { IDoctorRepository } from "../../../core/interfaces/repositories/IDoctorRepository";
import { DatabaseError } from "../../../utils/errors/DatabaseErrors";

export class DoctorRepository implements IDoctorRepository {
  private dbConnection: MySqlConnection;

  constructor(dbConnection: MySqlConnection) {
    this.dbConnection = dbConnection;
  }

  async findById(id: number): Promise<Doctor | null> {
    try {
      const result = await this.dbConnection.query<Doctor[]>(
        `
        SELECT 
          users.id
          users.name,
          users.email,
          users.phone_number,
          doctors.specialty,
          doctors.bio
        FROM doctors
        JOIN users ON doctors.id = users.id
        WHERE doctors.id = ?
        `,
        [id]
      );

      if (result.length === 0) {
        return null;
      }

      const doctor = result[0];

      return new Doctor(doctor.id, doctor.email, doctor.username, doctor.phoneNumber, doctor.specialty, doctor.bio);
    } catch (error) {
      console.error("Error find doctor by id:", error);
      throw new DatabaseError("Failed to find doctor by id", "FIND_DOCTOR_BY_ID_DB_ERROR");
    }
  }

  async findAll(): Promise<Doctor[] | null> {
    try {
      const result = await this.dbConnection.query<any[]>(
        `
        SELECT 
          users.id
          users.name,
          users.email,
          users.phone_number,
          doctors.specialty,
          doctors.bio
        FROM doctors
        JOIN users ON doctors.id = users.id
        `
      );

      if (result.length === 0) {
        return null;
      }

      return result.map(
        (doctor) =>
          new Doctor(doctor.id, doctor.email, doctor.username, doctor.phoneNumber, doctor.specialty, doctor.bio)
      );
    } catch (error) {
      console.error("Error find all doctors:", error);
      throw new DatabaseError("Failed to find all doctors", "FIND_ALL_DOCTORS_DB_ERROR");
    }
  }

  async create(doctor: Doctor): Promise<Doctor | null> {
    try {
      const result = await this.dbConnection.query<any>(
        `INSERT INTO doctors (id, specialty, bio) 
         VALUES (?, ?, ?)`,
        [doctor.id, doctor.specialty, doctor.bio]
      );

      const id = result.insertId;

      if (id < 0) {
        return null;
      }

      return new Doctor(id, doctor.username, doctor.email, doctor.phoneNumber, doctor.specialty, doctor.bio);
    } catch (error) {
      console.error("Error creating doctor:", error);
      throw new DatabaseError("Failed to create user", "CREATE_USER_DB_ERROR");
    }
  }

  async update(id: number, doctor: Partial<Doctor>): Promise<boolean> {
    try {
      const updateFields: string[] = [];
      const params: any[] = [];

      if (doctor.bio !== undefined) {
        updateFields.push("bio = ?");
        params.push(doctor.bio);
      }

      if (doctor.specialty !== undefined) {
        updateFields.push("specialty = ?");
        params.push(doctor.specialty);
      }

      updateFields.push("updated_at = ?");
      params.push(new Date());

      params.push(id);

      const result = await this.dbConnection.query<any>(
        `UPDATE doctors SET ${updateFields.join(", ")} WHERE id = ?`,
        params
      );

      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error update doctor:", error);
      throw new DatabaseError("Failed to update doctor", "UPDATE_DOCTOR_DB_ERROR");
    }
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.dbConnection.query<any>("DELETE FROM doctors WHERE id = ?", [id]);

    return result.affectedRows > 0;
  }

  async findBySpecialization(specialty: string): Promise<Doctor[]> {
    try {
      const result = await this.dbConnection.query<any[]>(
        `
          SELECT 
            users.id
            users.name,
            users.email,
            users.phone_number,
            doctors.specialty,
            doctors.bio
          FROM doctors
          JOIN users ON doctors.id = users.id
          WHERE doctors.specialty = ?
        `,
        [specialty]
      );

      return result.map(
        (doctor) =>
          new Doctor(doctor.id, doctor.username, doctor.email, doctor.phoneNumber, doctor.specialty, doctor.bio)
      );
    } catch (error) {
      console.error("Error find doctor by specialty:", error);
      throw new DatabaseError("Failed to finding doctor by specialty", "FIND_DOCTOR_BY_SPECIALTY_DB_ERROR");
    }
  }

  async findByEmail(email: string): Promise<Doctor | null> {
    try {
      const result = await this.dbConnection.query<any[]>(
        `
        SELECT 
          users.id
          users.name,
          users.email,
          users.phone_number,
          doctors.specialty,
          doctors.bio
        FROM doctors
        JOIN users ON doctors.id = users.id
        WHERE users.email = ?
      `,
        [email]
      );

      if (result.length === 0) {
        return null;
      }

      const doctor = result[0];
      return new Doctor(doctor.id, doctor.username, doctor.email, doctor.phoneNumber, doctor.specialty, doctor.bio);
    } catch (error) {
      console.error("Error find doctor by email:", error);
      throw new DatabaseError("Failed to finding doctor by email", "FIND_DOCTOR_BY_EMAIL_DB_ERROR");
    }
  }
}
