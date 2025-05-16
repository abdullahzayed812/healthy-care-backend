import { PatientRecord } from "../../entities/PatientRecord";
import { IRepository } from "./IRepository";

export interface IPatientRecordRepository extends IRepository<PatientRecord> {
  findByPatientId(patientId: number): Promise<PatientRecord[]>;
}
