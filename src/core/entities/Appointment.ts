export type AppointmentStatus = "SCHEDULE" | "COMPLETED" | "CANCELED";

export class Appointment {
  constructor(
    public id: number,
    public doctorId: number,
    public patientId: number,
    public startTime: string,
    public endTime: string,
    public dayOfWeek: string,
    public reason: string,
    public status: AppointmentStatus,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
