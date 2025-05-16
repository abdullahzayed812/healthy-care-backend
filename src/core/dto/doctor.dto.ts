import { Doctor } from "../entities/Doctor";

// ---------- GET ALL ----------
export interface GetAllDoctorsRequest {}
export interface GetAllDoctorsResponse {
  doctors: Doctor[];
}

// ---------- GET BY ID ----------
export interface GetDoctorByIdParams {
  id: string;
}
export interface GetDoctorByIdRequest {}
export interface GetDoctorByIdResponse extends Doctor {}

// ---------- CREATE ----------
export interface CreateDoctorRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  specialization: string;
}
export interface CreateDoctorResponse extends Doctor {}

// ---------- UPDATE ----------
export interface UpdateDoctorParams {
  id: string;
}
export interface UpdateDoctorRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  specialization?: string;
}
export interface UpdateDoctorResponse {
  message: string;
}

// ---------- DELETE ----------
export interface DeleteDoctorParams {
  id: string;
}
export interface DeleteDoctorRequest {}
export interface DeleteDoctorResponse {
  message: string;
}
