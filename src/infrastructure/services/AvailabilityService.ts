import { IAvailabilityRepository } from "../../core/interfaces/repositories/IAvailabilityRepository";
import { Availability } from "../../core/entities/Availability";
import { CreateAvailabilityRequest, UpdateAvailabilityRequest } from "../../core/dto/availability.dto";

export class AvailabilityService {
  constructor(private availabilityRepo: IAvailabilityRepository) {}

  getAll(): Promise<Availability[]> {
    return this.availabilityRepo.findAll();
  }

  getById(id: number): Promise<Availability | null> {
    return this.availabilityRepo.findById(id);
  }

  getByDoctor(doctorId: number): Promise<Availability[]> {
    return this.availabilityRepo.findByDoctorId(doctorId);
  }

  create(data: CreateAvailabilityRequest): Promise<Availability> {
    return this.availabilityRepo.create(data);
  }

  update(id: number, data: UpdateAvailabilityRequest): Promise<boolean> {
    return this.availabilityRepo.update(id, data);
  }

  delete(id: number): Promise<boolean> {
    return this.availabilityRepo.delete(id);
  }
}
