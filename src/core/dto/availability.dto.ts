import { Availability } from "../entities/Availability";
import { ParamsDictionary } from "express-serve-static-core";

export interface GetAllAvailabilitiesRequest {}
export interface GetAllAvailabilitiesResponse {
  availabilities: Availability[];
}

export interface GetAvailabilityByIdParams extends ParamsDictionary {
  id: string;
}
export interface GetAvailabilityByIdRequest {}
export interface GetAvailabilityByIdResponse extends Availability {}

export interface CreateAvailabilityRequest {
  doctorId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}
export interface CreateAvailabilityResponse extends Availability {}

export interface UpdateAvailabilityParams extends ParamsDictionary {
  id: string;
}
export interface UpdateAvailabilityRequest {
  dayOfWeek?: string;
  startTime?: string;
  endTime?: string;
}
export interface UpdateAvailabilityResponse {
  message: string;
}

export interface DeleteAvailabilityParams extends ParamsDictionary {
  id: string;
}
export interface DeleteAvailabilityRequest {}
export interface DeleteAvailabilityResponse {
  message: string;
}
