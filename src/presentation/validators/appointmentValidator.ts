import {
  CreateAppointmentRequest,
  GetAppointmentByDoctorIdParams,
  GetAppointmentByIdParams,
  GetAppointmentByPatientIdParams,
  UpdateAppointmentRequest,
  UpdateAppointmentStatusRequest,
} from "../../core/dto/appointment.dto";
import { AppointmentStatus } from "../../core/entities/Appointment";

// --- Shared Helpers ---

function isObject(value: any): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function hasOnlyAllowedKeys(obj: any, allowedKeys: string[]): boolean {
  return Object.keys(obj).every((key) => allowedKeys.includes(key));
}

function validateIdParam(
  params: any,
  expected: GetAppointmentByIdParams | GetAppointmentByDoctorIdParams | GetAppointmentByPatientIdParams
): true | { error: string; expected: typeof expected } {
  if (!isObject(params) || typeof params.id !== "string") {
    return {
      error: "Invalid route parameter. 'id' must be a string.",
      expected,
    };
  }
  return true;
}

// --- Appointment Structure Validator ---

export function isAppointment(item: any): boolean {
  return (
    isObject(item) &&
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

// --- Param Validators ---

export function isAppointmentIdParam(params: any) {
  return validateIdParam(params, { id: "appointment id as query parameter" });
}

export function isDoctorIdParams(params: any) {
  return validateIdParam(params, { id: "doctor id as query parameter" });
}

export function isPatientIdParams(params: any) {
  return validateIdParam(params, { id: "patient id as query parameter" });
}

export function isUpdateAppointmentStatusParams(params: any) {
  return validateIdParam(params, { id: "appointment id as query parameter" });
}

// --- Request Body Validators ---

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
    reason: "Some reason here",
    status: "SCHEDULED",
  };

  if (!isAppointment(body)) {
    return {
      error: "Invalid body structure for CreateAppointmentRequest.",
      expected,
    };
  }

  return true;
}

export function isUpdateAppointmentRequest(
  body: any
): true | { error: string; expected: Partial<UpdateAppointmentRequest> } {
  const expected: Partial<UpdateAppointmentRequest> = {
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "09:30",
    reason: "Optional reason",
    status: "SCHEDULED",
  };

  if (!isObject(body)) {
    return {
      error: "Request body must be an object.",
      expected,
    };
  }

  const allowedKeys = ["dayOfWeek", "startTime", "endTime", "reason", "status"];
  if (!hasOnlyAllowedKeys(body, allowedKeys)) {
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

export function isUpdateAppointmentStatusRequest(
  body: any
): true | { error: string; expected: UpdateAppointmentStatusRequest } {
  const expected: UpdateAppointmentStatusRequest = { status: "SCHEDULED" };

  if (!isObject(body)) {
    return {
      error: "Request body must be an object.",
      expected,
    };
  }

  const allowedKeys = ["status", "appointmentId"];
  if (!hasOnlyAllowedKeys(body, allowedKeys)) {
    return {
      error: `Invalid key(s) in body. Allowed keys: ${allowedKeys.join(", ")}`,
      expected,
    };
  }

  if (typeof body.status !== "string" || !["PENDING", "SCHEDULED", "COMPLETED", "CANCELLED"].includes(body.status)) {
    return {
      error: "Invalid or missing status value.",
      expected,
    };
  }

  return true;
}
