import { AppointmentService } from "../../infrastructure/services/AppointmentService";
import { ExpressHandler } from "../../utils/types/apis";
import {
  CreateAppointmentRequest,
  CreateAppointmentResponse,
  DeleteAppointmentParams,
  DeleteAppointmentRequest,
  DeleteAppointmentResponse,
  GetAllAppointmentsRequest,
  GetAllAppointmentsResponse,
  GetAllAppointmentsWithRelationsResponse,
  GetAppointmentByIdParams,
  GetAppointmentByIdRequest,
  GetAppointmentByIdResponse,
  IGetAppointmentsWithDoctorDate,
  UpdateAppointmentParams,
  UpdateAppointmentRequest,
  UpdateAppointmentResponse,
  UpdateAppointmentStatusParams,
  UpdateAppointmentStatusRequest,
  UpdateAppointmentStatusResponse,
} from "../../core/dto/appointment.dto";
import { handleErrorResponse } from "../../utils/errors/errorResponse";
import { getSocketServer } from "../../infrastructure/websocket/socket";

export class AppointmentController {
  constructor(private service: AppointmentService) {}

  getAll: ExpressHandler<GetAllAppointmentsRequest, GetAllAppointmentsResponse> = async (req, res) => {
    try {
      const appointments = await this.service.getAll();

      if (!appointments) {
        res.status(404).json({ error: "Can't found appointments..." });
        return;
      }

      res.status(200).json({ appointments });
    } catch (err) {
      handleErrorResponse(res, err);
    }
  };

  getAllWithRelations: ExpressHandler<{}, GetAllAppointmentsWithRelationsResponse> = async (req, res) => {
    try {
      const appointments = await this.service.getAllWithRelations();

      if (!appointments) {
        res.status(404).json({ error: "Cant found appointments..." });
        return;
      }

      res.status(200).json({ appointments });
      return;
    } catch (error) {
      handleErrorResponse(res, error);
      return;
    }
  };

  getById: ExpressHandler<GetAppointmentByIdRequest, GetAppointmentByIdResponse, GetAppointmentByIdParams> = async (
    req,
    res
  ) => {
    try {
      const id = parseInt(req.params.id);
      const appointment = await this.service.getById(id);

      if (!appointment) {
        res.status(404).json({ error: "Appointment not found" });
        return;
      }

      res.status(200).json(appointment);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };

  getByDoctorId: ExpressHandler<{}, { appointments: IGetAppointmentsWithDoctorDate[] }, { id: string }> = async (
    req,
    res
  ) => {
    try {
      const id = parseInt(req.params.id);
      const appointments = await this.service.findByDoctorId(id);

      if (!appointments) {
        res.status(200).json({ appointments: [] });
        return;
      }

      res.status(200).json({ appointments });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };

  getByPatientId: ExpressHandler<{}, any, { id: string }> = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const appointments = await this.service.findByPatientId(id);

      if (!appointments) {
        res.status(404).json({ error: "Can't get appointment by patient id." });
        return;
      }

      res.status(200).json(appointments);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };

  create: ExpressHandler<CreateAppointmentRequest, IGetAppointmentsWithDoctorDate> = async (req, res) => {
    try {
      const appointment = await this.service.create(req.body as CreateAppointmentRequest);

      if (!appointment) {
        res.status(404).json({ error: "Can't create appointment." });
        return;
      }

      // Emit event
      const io = getSocketServer();
      io.emit("appointment:created", appointment);

      res.status(201).json(appointment);
    } catch (error: any) {
      handleErrorResponse(res, error);
    }
  };

  update: ExpressHandler<UpdateAppointmentRequest, UpdateAppointmentResponse, UpdateAppointmentParams> = async (
    req,
    res
  ) => {
    try {
      const id = parseInt(req.params.id);
      const updated = await this.service.update(id, req.body);

      if (!updated) {
        res.status(404).json({ error: "Appointment not found" });
        return;
      }

      res.status(200).json({ message: "Appointment updated successfully" });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };

  updateStatus: ExpressHandler<
    UpdateAppointmentStatusRequest,
    UpdateAppointmentStatusResponse,
    UpdateAppointmentStatusParams
  > = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const updated = await this.service.updateStatus(id, status);

      if (!updated) {
        res.status(404).json({ error: "Appointment not found or update failed" });
        return;
      }

      res.status(200).json({ message: "Appointment status updated successfully" });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };

  delete: ExpressHandler<DeleteAppointmentRequest, DeleteAppointmentResponse, DeleteAppointmentParams> = async (
    req,
    res
  ) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.service.delete(id);

      if (!deleted) {
        res.status(404).json({ error: "Appointment not found" });
        return;
      }

      res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };
}
