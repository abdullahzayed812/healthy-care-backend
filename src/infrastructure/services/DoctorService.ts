import { IDoctorRepository } from "../../core/interfaces/repositories/IDoctorRepository";
import { Doctor } from "../../core/entities/Doctor";
import { CreateDoctorRequest, UpdateDoctorRequest } from "../../core/dto/doctor.dto";

export class DoctorService {
  constructor(private doctorRepo: IDoctorRepository) {}

  async getAllDoctors(): Promise<Doctor[] | null> {
    return this.doctorRepo.findAll();
  }

  async getDoctorById(id: number): Promise<Doctor | null> {
    return this.doctorRepo.findById(id);
  }

  async createDoctor(data: Doctor): Promise<Doctor | null> {
    return this.doctorRepo.create(data);
  }

  async updateDoctor(id: number, data: UpdateDoctorRequest): Promise<boolean> {
    return this.doctorRepo.update(id, data);
  }

  async deleteDoctor(id: number): Promise<boolean> {
    return this.doctorRepo.delete(id);
  }

  async findBySpecialization(specialization: string): Promise<Doctor[]> {
    return this.doctorRepo.findBySpecialization(specialization);
  }

  async findByEmail(email: string): Promise<Doctor | null> {
    return this.doctorRepo.findByEmail(email);
  }
}
