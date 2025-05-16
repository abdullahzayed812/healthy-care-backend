import { IRepository } from "./IRepository";
import { Availability } from "../../entities/Availability";

export interface IAvailabilityRepository extends IRepository<Availability> {
  findByDoctorId(doctorId: number): Promise<Availability[]>;
}
