import { MySqlConnection } from "../connections/MySqlConnection";
import { Patient } from "../../../core/entities/Patient";
import { IPatientRepository } from "../../../core/interfaces/repositories/IPatientRepository";

export class PatientRepository implements IPatientRepository {
  private dbConnection: MySqlConnection;

  constructor(dbConnection: MySqlConnection) {
    this.dbConnection = dbConnection;
  }

  async findById(id: number): Promise<Patient | null> {
    const result = await this.dbConnection.query<any[]>("SELECT * FROM patients WHERE id = ?", [id]);

    if (result.length === 0) {
      return null;
    }

    const patientData = result[0];
    return new Patient(
      patientData.id,
      patientData.first_name,
      patientData.last_name,
      patientData.email,
      patientData.phone_number,
      new Date(patientData.date_of_birth),
      patientData.address,
      new Date(patientData.created_at),
      new Date(patientData.updated_at)
    );
  }

  async findAll(): Promise<Patient[]> {
    const result = await this.dbConnection.query<any[]>("SELECT * FROM patients");

    return result.map(
      (patientData) =>
        new Patient(
          patientData.id,
          patientData.first_name,
          patientData.last_name,
          patientData.email,
          patientData.phone_number,
          new Date(patientData.date_of_birth),
          patientData.address,
          new Date(patientData.created_at),
          new Date(patientData.updated_at)
        )
    );
  }

  async create(patient: Omit<Patient, "id">): Promise<Patient> {
    const now = new Date();
    const result = await this.dbConnection.query<any>(
      `INSERT INTO patients (first_name, last_name, email, phone_number, date_of_birth, address, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        patient.firstName,
        patient.lastName,
        patient.email,
        patient.phoneNumber,
        patient.dateOfBirth,
        patient.address,
        now,
        now,
      ]
    );

    const id = result.insertId;
    return new Patient(
      id,
      patient.firstName,
      patient.lastName,
      patient.email,
      patient.phoneNumber,
      patient.dateOfBirth,
      patient.address,
      now,
      now
    );
  }

  async update(id: number, patient: Partial<Patient>): Promise<boolean> {
    const updateFields: string[] = [];
    const params: any[] = [];

    if (patient.firstName !== undefined) {
      updateFields.push("first_name = ?");
      params.push(patient.firstName);
    }

    if (patient.lastName !== undefined) {
      updateFields.push("last_name = ?");
      params.push(patient.lastName);
    }

    if (patient.email !== undefined) {
      updateFields.push("email = ?");
      params.push(patient.email);
    }

    if (patient.phoneNumber !== undefined) {
      updateFields.push("phone_number = ?");
      params.push(patient.phoneNumber);
    }

    if (patient.dateOfBirth !== undefined) {
      updateFields.push("date_of_birth = ?");
      params.push(patient.dateOfBirth);
    }

    if (patient.address !== undefined) {
      updateFields.push("address = ?");
      params.push(patient.address);
    }

    updateFields.push("updated_at = ?");
    params.push(new Date());

    params.push(id);

    const result = await this.dbConnection.query<any>(
      `UPDATE patients SET ${updateFields.join(", ")} WHERE id = ?`,
      params
    );

    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.dbConnection.query<any>("DELETE FROM patients WHERE id = ?", [id]);

    return result.affectedRows > 0;
  }

  async findByEmail(email: string): Promise<Patient | null> {
    const result = await this.dbConnection.query<any[]>("SELECT * FROM patients WHERE email = ?", [email]);

    if (result.length === 0) {
      return null;
    }

    const patientData = result[0];
    return new Patient(
      patientData.id,
      patientData.first_name,
      patientData.last_name,
      patientData.email,
      patientData.phone_number,
      new Date(patientData.date_of_birth),
      patientData.address,
      new Date(patientData.created_at),
      new Date(patientData.updated_at)
    );
  }

  async searchByName(name: string): Promise<Patient[]> {
    const searchPattern = `%${name}%`;
    const result = await this.dbConnection.query<any[]>(
      "SELECT * FROM patients WHERE first_name LIKE ? OR last_name LIKE ?",
      [searchPattern, searchPattern]
    );

    return result.map(
      (patientData) =>
        new Patient(
          patientData.id,
          patientData.first_name,
          patientData.last_name,
          patientData.email,
          patientData.phone_number,
          new Date(patientData.date_of_birth),
          patientData.address,
          new Date(patientData.created_at),
          new Date(patientData.updated_at)
        )
    );
  }
}
