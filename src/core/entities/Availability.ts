export class Availability {
  constructor(
    public id: string,
    public doctorId: number,
    public dayOfWeek: number, // e.g., 'Monday'
    public startTime: string, // e.g., '09:00'
    public endTime: string, // e.g., '17:00'
    public available: boolean,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
