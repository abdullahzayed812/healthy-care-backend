import { IRepository } from "./IRepository";
import { Patient } from "../../entities/Patient";

export interface IPatientRepository extends IRepository<Patient> {
  findByEmail(email: string): Promise<Patient | null>;
  searchByName(name: string): Promise<Patient[]>;
}
