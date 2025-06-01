import {
  CreateAppointmentRequest,
  GetAppointmentByDoctorIdParams,
  GetAppointmentByIdParams,
  GetAppointmentByPatientIdParams,
  UpdateAppointmentRequest,
} from "../../core/dto/appointment.dto";
import { Appointment } from "../../core/entities/Appointment";

// Helper to validate an Appointment object
export function isAppointment(item: any): item is Appointment {
  return (
    typeof item === "object" &&
    typeof item.doctorId === "number" &&
    typeof item.patientId === "number" &&
    typeof item.dayOfWeek === "number" &&
    typeof item.startTime === "string" &&
    typeof item.endTime === "string" &&
    typeof item.date === "string" &&
    typeof item.reason === "string" &&
    typeof item.status === "string"
  );
}

// GetAppointmentByIdParams validator
export function isAppointmentIdParam(params: any): true | { error: string; expected: GetAppointmentByIdParams } {
  const expected: GetAppointmentByIdParams = { id: "doctor id as query parameter" };

  if (typeof params !== "object" || typeof params.id !== "string") {
    return {
      error: "Invalid route parameter. 'id' must be a string.",
      expected,
    };
  }

  return true;
}

// GetAppointmentByDoctorIdParams validator
export function isDoctorIdParams(params: any): true | { error: string; expected: GetAppointmentByDoctorIdParams } {
  const expected: GetAppointmentByDoctorIdParams = { id: "doctor id as query parameter" };

  if (typeof params !== "object" || typeof params.id !== "string") {
    return {
      error: "Invalid route parameter. 'id' must be a string.",
      expected,
    };
  }

  return true;
}

// GetAppointmentByPatientIdParams validator
export function isPatientIdParams(params: any): true | { error: string; expected: GetAppointmentByPatientIdParams } {
  const expected: GetAppointmentByDoctorIdParams = { id: "doctor id as query parameter" };

  if (typeof params !== "object" || typeof params.id !== "string") {
    return {
      error: "Invalid route parameter. 'id' must be a string.",
      expected,
    };
  }

  return true;
}

// CreateAppointmentRequest validator
export function isCreateAppointmentRequest(
  body: CreateAppointmentRequest
): true | { error: string; expected: CreateAppointmentRequest } {
  const expected: CreateAppointmentRequest = {
    doctorId: 123,
    patientId: 123,
    dayOfWeek: 1,
    date: "12-12-2012",
    startTime: "09:00",
    endTime: "09:30",
    reason: "Some text to describe reason",
    status: "SCHEDULE",
  };

  if (!isAppointment(body)) {
    return {
      error: "Invalid body structure for CreateAppointmentRequest.",
      expected,
    };
  }

  return true;
}

// UpdateAppointmentRequest validator
export function isUpdateAppointmentRequest(
  body: any
): true | { error: string; expected: Partial<UpdateAppointmentRequest> } {
  const expected: Partial<UpdateAppointmentRequest> = {
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "09:30",
  };

  if (!body || typeof body !== "object") {
    return {
      error: "Request body must be an object.",
      expected,
    };
  }

  const allowedKeys = ["dayOfWeek", "startTime", "endTime"];
  const keys = Object.keys(body);

  const hasInvalidKey = keys.some((key) => !allowedKeys.includes(key));
  if (hasInvalidKey) {
    return {
      error: `Invalid key(s) in body. Allowed keys: ${allowedKeys.join(", ")}`,
      expected,
    };
  }

  if (
    (body.dayOfWeek !== undefined && typeof body.dayOfWeek !== "number") ||
    (body.startTime !== undefined && typeof body.startTime !== "string") ||
    (body.endTime !== undefined && typeof body.endTime !== "string") ||
    (body.reason !== undefined && typeof body.reason !== "string") ||
    (body.status !== undefined && typeof body.status !== "string")
  ) {
    return {
      error: "One or more fields have an incorrect type.",
      expected,
    };
  }

  return true;
}
