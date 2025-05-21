import { IRepository } from "./IRepository";
import { Availability } from "../../entities/Availability";
import { CreateBulkAvailabilityRequest } from "../../dto/availability.dto";

export interface IAvailabilityRepository extends IRepository<Availability> {
  findByDoctorId(doctorId: number): Promise<Availability[]>;
  createBulk(data: CreateBulkAvailabilityRequest): Promise<any>;
}
