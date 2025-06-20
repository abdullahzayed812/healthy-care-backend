import { Appointment, AppointmentStatus } from "../entities/Appointment";
import { ParamsDictionary } from "express-serve-static-core";

// ---------- GET ALL ----------
export interface GetAllAppointmentsRequest {}
export interface GetAllAppointmentsResponse {
  appointments: Appointment[];
}

// ---------- GET ALL WITH RELATIONS ----------
export interface GetAllAppointmentsWithRelationsResponse {
  appointments: any[] | null;
}

// ---------- GET BY ID ----------
export interface GetAppointmentByIdParams extends ParamsDictionary {
  id: string;
}
export interface GetAppointmentByIdRequest {}
export interface GetAppointmentByIdResponse extends Appointment {}

// ---------- GET BY DOCTOR ID ----------
export interface GetAppointmentByDoctorIdParams extends ParamsDictionary {
  id: string;
}
export interface GetAppointmentByDoctorIdRequest {}
export interface GetAppointmentByDoctorIdResponse {
  appointments: Appointment[];
}

// ---------- GET BY PATIENT ID ----------
export interface GetAppointmentByPatientIdParams extends ParamsDictionary {
  id: string;
}
export interface GetAppointmentByPatientIdRequest {}
export interface GetAppointmentByPatientIdResponse {
  appointments: Appointment[];
}
export interface IGetAppointmentsWithDoctorDate {
  id: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  date: string;
  reason: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  doctor: {
    id: string;
    email: string;
    username: string;
    phone: string;
    specialty: string;
    bio: string;
    experience: string;
    reviews: string;
  };
}

// ---------- CREATE ----------
export interface CreateAppointmentRequest {
  doctorId: number;
  patientId: number;
  startTime: string;
  endTime: string;
  dayOfWeek: number;
  date: string;
  reason: string;
  status: AppointmentStatus;
}
export interface CreateAppointmentResponse extends Appointment {}

// ---------- UPDATE ----------
export interface UpdateAppointmentParams extends ParamsDictionary {
  id: string;
}
export interface UpdateAppointmentRequest {
  doctorId?: number;
  patientId?: number;
  startTime?: string;
  endTime?: string;
  dayOfWeek?: number;
  reason?: string;
  status?: AppointmentStatus;
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
