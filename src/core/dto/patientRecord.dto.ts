import { PatientRecord } from "../entities/PatientRecord";
import { ParamsDictionary } from "express-serve-static-core";

// ---------- GET ALL ----------
export interface GetAllPatientRecordsRequest {}
export interface GetAllPatientRecordsResponse {
  records: PatientRecord[];
}

// ---------- GET BY PATIENT ----------
export interface GetRecordsByPatientParams extends ParamsDictionary {
  id: string;
}
export interface GetRecordsByPatientRequest {}
export interface GetRecordsByPatientResponse {
  records: PatientRecord[];
}

// ---------- GET BY ID ----------

export interface GetPatientRecordByIdParams extends ParamsDictionary {
  id: string;
}
export interface GetPatientRecordByIdRequest {}
export interface GetPatientRecordByIdResponse extends PatientRecord {}

// ---------- CREATE ----------
export interface CreatePatientRecordRequest {
  patientId: number;
  doctorId: number;
  title: string;
  description: string;
  date: string; // "YYYY-MM-DD"
}
export interface CreatePatientRecordResponse extends PatientRecord {}

// ---------- UPDATE ----------
export interface UpdatePatientRecordParams extends ParamsDictionary {
  id: string;
}

export interface UpdatePatientRecordRequest {
  title?: string;
  description?: string;
  date?: string; // Optional update
}

export interface UpdatePatientRecordResponse {
  message: string;
}

// ---------- DELETE ----------
export interface DeletePatientRecordParams extends ParamsDictionary {
  id: string;
}
export interface DeletePatientRecordResponse {
  message: string;
}
