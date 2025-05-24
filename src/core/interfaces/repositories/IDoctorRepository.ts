import { IRepository } from "./IRepository";
import { Doctor } from "../../entities/Doctor";

export interface IDoctorRepository {
  findAll(): Promise<Doctor[] | null>;
  findById(id: number): Promise<Doctor | null>;
  findBySpecialization(specialization: string): Promise<Doctor[]>;
  findByEmail(email: string): Promise<Doctor | null>;
  create(doctor: Doctor): Promise<Doctor | null>;
  update(id: number, doctor: Partial<Doctor>): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
