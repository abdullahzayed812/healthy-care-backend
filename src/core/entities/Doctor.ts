export class Doctor {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string,
    public specialization: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
