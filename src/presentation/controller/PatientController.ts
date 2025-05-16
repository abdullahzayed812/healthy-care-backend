// src/presentation/controllers/PatientController.ts

import { Request, Response } from "express";
import { PatientService } from "../../infrastructure/services/PatientService";

export class PatientController {
  constructor(private patientService: PatientService) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const patients = await this.patientService.getAllPatients();
      res.status(200).json(patients);
    } catch (error) {
      console.error("Error fetching patients:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const patient = await this.patientService.getPatientById(id);

      if (!patient) {
        res.status(404).json({ error: "Patient not found" });
        return;
      }

      res.status(200).json(patient);
    } catch (error) {
      console.error("Error fetching patient by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const newPatient = await this.patientService.createPatient(req.body);
      res.status(201).json(newPatient);
    } catch (error) {
      console.error("Error creating patient:", error);
      res.status(400).json({ error: "Invalid request data" });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const updated = await this.patientService.updatePatient(id, req.body);

      if (!updated) {
        res.status(404).json({ error: "Patient not found or not updated" });
        return;
      }

      res.status(200).json({ message: "Patient updated successfully" });
    } catch (error) {
      console.error("Error updating patient:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.patientService.deletePatient(id);

      if (!deleted) {
        res.status(404).json({ error: "Patient not found or already deleted" });
        return;
      }

      res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
      console.error("Error deleting patient:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // async searchByName(req: Request, res: Response): Promise<void> {
  //   try {
  //     const name = req.query.name as string;

  //     if (!name) {
  //       res.status(400).json({ error: 'Missing query parameter: name' });
  //       return;
  //     }

  //     const patients = await this.patientService.searchPatientsByName(name);
  //     res.status(200).json(patients);
  //   } catch (error) {
  //     console.error('Error searching patients by name:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // }
}
