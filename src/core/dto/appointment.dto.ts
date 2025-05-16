import { Appointment } from "../entities/Appointment";
import { ParamsDictionary } from "express-serve-static-core";

// ---------- GET ALL ----------
export interface GetAllAppointmentsRequest {}
export interface GetAllAppointmentsResponse {
  appointments: Appointment[];
}

// ---------- GET BY ID ----------
export interface GetAppointmentByIdParams extends ParamsDictionary {
  id: string;
}
export interface GetAppointmentByIdRequest {}
export interface GetAppointmentByIdResponse extends Appointment {}

// ---------- CREATE ----------
export interface CreateAppointmentRequest {
  doctorId: number;
  patientId: number;
  date: string;
  reason: string;
}
export interface CreateAppointmentResponse extends Appointment {}

// ---------- UPDATE ----------
export interface UpdateAppointmentParams extends ParamsDictionary {
  id: string;
}
export interface UpdateAppointmentRequest {
  doctorId?: number;
  patientId?: number;
  date?: string;
  reason?: string;
}
export interface UpdateAppointmentResponse {
  message: string;
}

// ---------- DELETE ----------
export interface DeleteAppointmentParams extends ParamsDictionary {
  id: string;
}
export interface DeleteAppointmentRequest {}
export interface DeleteAppointmentResponse {
  message: string;
}
