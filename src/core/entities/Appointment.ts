export type AppointmentStatus = "PENDING" | "SCHEDULED" | "COMPLETED" | "CANCELLED";

export class Appointment {
  constructor(
    public id: number,
    public doctorId: number,
    public patientId: number,
    public dayOfWeek: number,
    public startTime: string,
    public endTime: string,
    public date: string,
    public reason: string,
    public status: AppointmentStatus,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
