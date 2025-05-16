import { PatientRecordService } from "../../infrastructure/services/PatientRecordService";
import {
  GetAllPatientRecordsRequest,
  GetAllPatientRecordsResponse,
  GetPatientRecordByIdParams,
  GetPatientRecordByIdRequest,
  GetPatientRecordByIdResponse,
  GetRecordsByPatientParams,
  GetRecordsByPatientRequest,
  GetRecordsByPatientResponse,
  CreatePatientRecordRequest,
  CreatePatientRecordResponse,
  DeletePatientRecordParams,
  DeletePatientRecordResponse,
} from "../../core/dto/patientRecord.dto";
import { ExpressHandler } from "../../utils/types/apis";

export class PatientRecordController {
  constructor(private service: PatientRecordService) {}

  getAll: ExpressHandler<GetAllPatientRecordsRequest, GetAllPatientRecordsResponse> = async (req, res) => {
    const records = await this.service.getAll();
    res.status(200).json({ records });
  };

  getById: ExpressHandler<GetPatientRecordByIdRequest, GetPatientRecordByIdResponse, GetPatientRecordByIdParams> =
    async (req, res) => {
      const record = await this.service.getById(Number(req.params.id));
      if (!record) {
        res.status(404).json({ error: "Not found", details: "Record does not exist" });
        return;
      }
      res.status(200).json(record);
    };

  getByPatient: ExpressHandler<GetRecordsByPatientRequest, GetRecordsByPatientResponse, GetRecordsByPatientParams> =
    async (req, res) => {
      const records = await this.service.getByPatientId(Number(req.params.id));
      res.status(200).json({ records });
    };

  create: ExpressHandler<CreatePatientRecordRequest, CreatePatientRecordResponse> = async (req, res) => {
    const record = await this.service.create(req.body as CreatePatientRecordRequest);
    res.status(201).json(record);
  };

  delete: ExpressHandler<{}, DeletePatientRecordResponse, DeletePatientRecordParams> = async (req, res) => {
    const deleted = await this.service.delete(Number(req.params.id));
    if (!deleted) {
      res.status(404).json({ error: "Not found", details: "Record not found" });
      return;
    }
    res.status(200).json({ message: "Record deleted successfully" });
  };
}
