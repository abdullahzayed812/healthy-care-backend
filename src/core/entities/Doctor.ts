import { User } from "./User";

export class Doctor extends User {
  constructor(
    public id: number,
    public email: string,
    public username: string,
    public phoneNumber: string,
    public specialization: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {
    super(id, email, username, "doctor", undefined, phoneNumber, undefined, createdAt, updatedAt);
    this.specialization = specialization;
  }
}
