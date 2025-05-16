import { DoctorService } from "../../infrastructure/services/DoctorService";
import { ExpressHandler } from "../../utils/types/apis";
import {
  CreateDoctorRequest,
  CreateDoctorResponse,
  DeleteDoctorParams,
  DeleteDoctorRequest,
  DeleteDoctorResponse,
  GetAllDoctorsRequest,
  GetAllDoctorsResponse,
  GetDoctorByIdParams,
  GetDoctorByIdRequest,
  GetDoctorByIdResponse,
  UpdateDoctorParams,
  UpdateDoctorRequest,
  UpdateDoctorResponse,
} from "../../core/dto/doctor.dto";

export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  getAll: ExpressHandler<GetAllDoctorsRequest, GetAllDoctorsResponse> = async (req, res) => {
    try {
      const doctors = await this.doctorService.getAllDoctors();
      res.status(200).json({ doctors });
    } catch (error) {
      console.error("Error fetching doctors:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getById: ExpressHandler<GetDoctorByIdRequest, GetDoctorByIdResponse, GetDoctorByIdParams> = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const doctor = await this.doctorService.getDoctorById(id);

      if (!doctor) {
        res.status(404).json({ error: "Doctor not found" });
        return;
      }

      res.status(200).json(doctor);
    } catch (error) {
      console.error("Error fetching doctor:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  create: ExpressHandler<CreateDoctorRequest, CreateDoctorResponse> = async (req, res) => {
    try {
      const doctor = await this.doctorService.createDoctor(req.body as CreateDoctorRequest);
      res.status(201).json(doctor);
    } catch (error: any) {
      console.error("Error creating doctor:", error);
      res.status(400).json({ error: "Invalid request", details: error.message });
    }
  };

  update: ExpressHandler<UpdateDoctorRequest, UpdateDoctorResponse, UpdateDoctorParams> = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await this.doctorService.updateDoctor(id, req.body);

      if (!success) {
        res.status(404).json({ error: "Doctor not found or not updated" });
        return;
      }

      res.status(200).json({ message: "Doctor updated successfully" });
    } catch (error) {
      console.error("Error updating doctor:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  delete: ExpressHandler<DeleteDoctorRequest, DeleteDoctorResponse, DeleteDoctorParams> = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await this.doctorService.deleteDoctor(id);

      if (!success) {
        res.status(404).json({ error: "Doctor not found or not deleted" });
        return;
      }

      res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
      console.error("Error deleting doctor:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
