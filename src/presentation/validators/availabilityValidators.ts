import {
  CreateAvailabilityRequest,
  GetAvailabilityByIdParams,
  UpdateAvailabilityRequest,
} from "../../core/dto/availability.dto";

export function isAvailabilityParams(params: GetAvailabilityByIdParams): params is GetAvailabilityByIdParams {
  return typeof params === "object" && typeof params.id === "string";
}

export function isCreateAvailabilityRequest(body: CreateAvailabilityRequest): body is CreateAvailabilityRequest {
  return (
    typeof body === "object" &&
    typeof body.doctorId === "string" &&
    typeof body.dayOfWeek === "string" &&
    typeof body.startTime === "string" &&
    typeof body.endTime === "string"
  );
}

export function isUpdateAvailabilityRequest(body: UpdateAvailabilityRequest): body is UpdateAvailabilityRequest {
  if (!body || typeof body !== "object") return false;

  const allowedKeys = ["dayOfWeek", "startTime", "endTime"];
  const hasInvalidKey = Object.keys(body).some((key) => !allowedKeys.includes(key));
  if (hasInvalidKey) return false;

  return (
    (!body.dayOfWeek || typeof body.dayOfWeek === "string") &&
    (!body.startTime || typeof body.startTime === "string") &&
    (!body.endTime || typeof body.endTime === "string")
  );
}
