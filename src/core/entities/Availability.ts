export class Availability {
  constructor(
    public id: number,
    public doctorId: number,
    public dayOfWeek: string, // e.g., 'Monday'
    public startTime: string, // e.g., '09:00'
    public endTime: string, // e.g., '17:00'
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
