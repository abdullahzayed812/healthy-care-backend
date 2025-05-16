export class Appointment {
  constructor(
    public id: number,
    public doctorId: number,
    public patientId: number,
    public date: string,
    public reason: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
