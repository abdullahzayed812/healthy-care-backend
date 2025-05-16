import { IPatientRecordRepository } from "../../core/interfaces/repositories/IPatientRecordRepository";
import { CreatePatientRecordRequest, UpdatePatientRecordRequest } from "../../core/dto/patientRecord.dto";
import { PatientRecord } from "../../core/entities/PatientRecord";

export class PatientRecordService {
  constructor(private repo: IPatientRecordRepository) {}

  getAll(): Promise<PatientRecord[]> {
    return this.repo.findAll();
  }

  getById(id: number): Promise<PatientRecord | null> {
    return this.repo.findById(id);
  }

  getByPatientId(patientId: number): Promise<PatientRecord[]> {
    return this.repo.findByPatientId(patientId);
  }

  create(data: CreatePatientRecordRequest): Promise<PatientRecord> {
    return this.repo.create(data);
  }

  async update(id: number, data: UpdatePatientRecordRequest): Promise<boolean> {
    return this.repo.update(id, data);
  }

  delete(id: number): Promise<boolean> {
    return this.repo.delete(id);
  }
}
