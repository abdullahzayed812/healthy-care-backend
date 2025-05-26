import {
  CreateAvailabilityRequest,
  CreateBulkAvailabilityRequest,
  GetAvailabilityByDoctorIdParams,
  GetAvailabilityByIdParams,
  UpdateAvailabilityRequest,
} from "../../core/dto/availability.dto";
import { Availability } from "../../core/entities/Availability";

// Helper to validate an Availability object
export function isAvailability(item: any): item is Availability {
  return (
    typeof item === "object" &&
    // typeof item.doctorId === "string" &&
    typeof item.dayOfWeek === "number" &&
    typeof item.startTime === "string" &&
    typeof item.endTime === "string"
  );
}

// GetAvailabilityByIdParams validator
export function isAvailabilityParams(params: any): true | { error: string; expected: GetAvailabilityByIdParams } {
  const expected: GetAvailabilityByIdParams = { id: "doctor id as query parameter" };

  if (typeof params !== "object" || typeof params.id !== "string") {
    return {
      error: "Invalid route parameter. 'id' must be a string.",
      expected,
    };
  }

  return true;
}

// GetAvailabilityByDoctorIdParams validator
export function isDoctorIdParams(params: any): true | { error: string; expected: GetAvailabilityByDoctorIdParams } {
  const expected: GetAvailabilityByDoctorIdParams = { id: "doctor id as query parameter" };

  if (typeof params !== "object" || typeof params.id !== "string") {
    return {
      error: "Invalid route parameter. 'id' must be a string.",
      expected,
    };
  }

  return true;
}

// CreateAvailabilityRequest validator
export function isCreateAvailabilityRequest(
  body: CreateAvailabilityRequest
): true | { error: string; expected: CreateAvailabilityRequest } {
  const expected: CreateAvailabilityRequest = {
    doctorId: 123,
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "09:30",
    available: true,
  };

  if (!isAvailability(body)) {
    return {
      error: "Invalid body structure for CreateAvailabilityRequest.",
      expected,
    };
  }

  return true;
}

// CreateBulkAvailabilityRequest validator
export function isCreateBulkAvailabilityRequest(
  body: CreateBulkAvailabilityRequest
): true | { error: string; expected: CreateBulkAvailabilityRequest } {
  const expected: CreateBulkAvailabilityRequest = {
    doctorId: 123,
    slots: [
      {
        id: "123",
        dayOfWeek: 1,
        startTime: "09:00",
        endTime: "09:30",
      },
    ],
  };

  if (
    typeof body !== "object" ||
    typeof body.doctorId !== "number" ||
    !Array.isArray(body.slots) ||
    !body.slots.every(isAvailability)
  ) {
    return {
      error: "Invalid request body structure for CreateBulkAvailabilityRequest.",
      expected,
    };
  }

  return true;
}

// UpdateAvailabilityRequest validator
export function isUpdateAvailabilityRequest(
  body: any
): true | { error: string; expected: Partial<UpdateAvailabilityRequest> } {
  const expected: Partial<UpdateAvailabilityRequest> = {
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
    (body.endTime !== undefined && typeof body.endTime !== "string")
  ) {
    return {
      error: "One or more fields have an incorrect type.",
      expected,
    };
  }

  return true;
}
