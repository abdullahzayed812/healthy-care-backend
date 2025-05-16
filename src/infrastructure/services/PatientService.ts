import { IPatientRepository } from "../../core/interfaces/repositories/IPatientRepository";
import { Patient } from "../../core/entities/Patient";

export class PatientService {
  constructor(private patientRepo: IPatientRepository) {}

  async getAllPatients(): Promise<Patient[]> {
    return this.patientRepo.findAll();
  }

  async getPatientById(id: number): Promise<Patient | null> {
    return this.patientRepo.findById(id);
  }

  async createPatient(patient: Omit<Patient, "id">): Promise<Patient> {
    return this.patientRepo.create(patient);
  }

  async updatePatient(id: number, patient: Partial<Patient>): Promise<boolean> {
    return this.patientRepo.update(id, patient);
  }

  async deletePatient(id: number): Promise<boolean> {
    return this.patientRepo.delete(id);
  }

  async findByEmail(email: string): Promise<Patient | null> {
    return this.patientRepo.findByEmail(email);
  }

  async searchByName(name: string): Promise<Patient[]> {
    return this.patientRepo.searchByName(name);
  }
}
