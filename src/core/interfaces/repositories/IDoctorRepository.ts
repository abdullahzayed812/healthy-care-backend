import { IRepository } from "./IRepository";
import { Doctor } from "../../entities/Doctor";

export interface IDoctorRepository extends IRepository<Doctor> {
  findBySpecialization(specialization: string): Promise<Doctor[]>;
  findByEmail(email: string): Promise<Doctor | null>;
}
