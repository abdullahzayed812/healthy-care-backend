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
import { handleErrorResponse } from "../../utils/errors/errorResponse";
import { Doctor } from "../../core/entities/Doctor";

export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  getAll: ExpressHandler<GetAllDoctorsRequest, GetAllDoctorsResponse> = async (req, res) => {
    try {
      const doctors = await this.doctorService.getAllDoctors();

      if (!doctors) {
        res.status(404).json({ error: "Can't found doctors..." });
        return;
      }

      res.status(200).json({ doctors });
      return;
    } catch (error) {
      handleErrorResponse(res, error);
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

      res.status(200).json({ doctor });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };

  create: ExpressHandler<CreateDoctorRequest, CreateDoctorResponse> = async (req, res) => {
    try {
      const doctor = await this.doctorService.createDoctor(req.body as Doctor);

      if (!doctor) {
        res.status(404).json({ error: "Doctor not created." });
        return;
      }

      res.status(201).json({ doctor });
      return;
    } catch (error: any) {
      handleErrorResponse(res, error);
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
      handleErrorResponse(res, error);
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
      handleErrorResponse(res, error);
    }
  };
}
