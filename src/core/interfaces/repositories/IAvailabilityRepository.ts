import { IRepository } from "./IRepository";
import { Availability } from "../../entities/Availability";
import {
  CreateAvailabilityRequest,
  CreateAvailabilityResponse,
  CreateBulkAvailabilityRequest,
} from "../../dto/availability.dto";

export interface IAvailabilityRepository {
  findAll(): Promise<Availability[]>;
  findById(id: number): Promise<Availability | null>;
  findByDoctorId(doctorId: number): Promise<Availability[]>;
  createBulk(data: CreateBulkAvailabilityRequest): Promise<any>;
  create(data: CreateAvailabilityRequest): Promise<CreateAvailabilityResponse>;
  update(id: number, data: Partial<Availability>): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
