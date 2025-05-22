import {
  CreateAvailabilityRequest,
  CreateAvailabilityResponse,
  CreateBulkAvailabilityRequest,
  CreateBulkAvailabilityResponse,
  DeleteAvailabilityParams,
  DeleteAvailabilityRequest,
  DeleteAvailabilityResponse,
  GetAllAvailabilitiesResponse,
  GetAvailabilityByIdParams,
  GetAvailabilityByIdResponse,
  UpdateAvailabilityParams,
  UpdateAvailabilityRequest,
  UpdateAvailabilityResponse,
} from "../../core/dto/availability.dto";
import { AvailabilityService } from "../../infrastructure/services/AvailabilityService";
import { ExpressHandler } from "../../utils/types/apis";

export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  // GET /availabilities
  public getAll: ExpressHandler<{}, GetAllAvailabilitiesResponse> = async (req, res) => {
    try {
      const availabilities = await this.availabilityService.getAll();
      res.json({ availabilities });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch availabilities", details: String(err) });
    }
  };

  // GET /availabilities/:id
  public getById: ExpressHandler<{}, GetAvailabilityByIdResponse, GetAvailabilityByIdParams> = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      // console.log(req.params.id);
      const availability = await this.availabilityService.getById(id);
      if (!availability) {
        res.status(404).json({ error: "Not found", details: "Availability not found" });
        return;
      }
      res.json(availability);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch availability", details: String(err) });
    }
  };

  // GET /availabilities/doctors/:id
  public getByDoctor: ExpressHandler<{}, GetAllAvailabilitiesResponse, { id: string }> = async (req, res) => {
    try {
      const doctorId = parseInt(req.params.id);
      const availabilities = await this.availabilityService.getByDoctor(doctorId);
      res.json({ availabilities });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch doctor's availability", details: String(err) });
    }
  };

  // POST /availabilities
  public create: ExpressHandler<CreateAvailabilityRequest, CreateAvailabilityResponse> = async (req, res) => {
    try {
      const availability = await this.availabilityService.create(req.body as CreateAvailabilityRequest);
      res.status(201).json(availability);
    } catch (err) {
      res.status(500).json({ error: "Failed to create availability", details: String(err) });
    }
  };

  // POST /availabilities/bulk
  public createBulk: ExpressHandler<CreateBulkAvailabilityRequest, CreateBulkAvailabilityResponse> = async (
    req,
    res
  ) => {
    try {
      const { success, insertedCount, message } = await this.availabilityService.createBulk(
        req.body as CreateBulkAvailabilityRequest
      );
      res.status(201).json({ success, insertedCount, message: "Availabilities created successfully." });
    } catch (err) {
      res.status(500).json({ error: "Failed to create availability", details: String(err) });
    }
  };

  // PUT /availabilities/:id
  public update: ExpressHandler<UpdateAvailabilityRequest, UpdateAvailabilityResponse, UpdateAvailabilityParams> =
    async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        const success = await this.availabilityService.update(id, req.body);
        if (!success) {
          res.status(404).json({ error: "Not found", details: "Availability not found" });
          return;
        }
        res.json({ message: "Availability updated" });
      } catch (err) {
        res.status(500).json({ error: "Failed to update availability", details: String(err) });
      }
    };

  // DELETE /availabilities/:id
  public delete: ExpressHandler<DeleteAvailabilityRequest, DeleteAvailabilityResponse, DeleteAvailabilityParams> =
    async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        const success = await this.availabilityService.delete(id);
        if (!success) {
          res.status(404).json({ error: "Not found", details: "Availability not found" });
          return;
        }
        res.json({ message: "Availability deleted" });
      } catch (err) {
        res.status(500).json({ error: "Failed to delete availability", details: String(err) });
      }
    };
}
