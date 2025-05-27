import { Doctor } from "../entities/Doctor";
import { ParamsDictionary } from "express-serve-static-core";

// ---------- GET ALL ----------
export interface GetAllDoctorsRequest {}
export interface GetAllDoctorsResponse {
  doctors: Doctor[];
}

// ---------- GET BY ID ----------
export interface GetDoctorByIdParams extends ParamsDictionary {
  id: string;
}
export interface GetDoctorByIdRequest {}
export interface GetDoctorByIdResponse {
  doctor: Doctor;
}

// ---------- CREATE ----------
export interface CreateDoctorRequest {
  id: number;
  specialty: string;
  bio: string;
}
export interface CreateDoctorResponse {
  doctor: Doctor;
}

// ---------- UPDATE ----------
export interface UpdateDoctorParams extends ParamsDictionary {
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
export interface DeleteDoctorParams extends ParamsDictionary {
  id: string;
}
export interface DeleteDoctorRequest {}
export interface DeleteDoctorResponse {
  message: string;
}
