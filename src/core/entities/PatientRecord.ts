export class PatientRecord {
  constructor(
    public id: number,
    public patientId: number,
    public doctorId: number,
    public title: string,
    public description: string,
    public date: string, // ISO: "YYYY-MM-DD"
    public createdAt: Date = new Date()
  ) {}
}
