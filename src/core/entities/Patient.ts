import { User } from "./User";

export class Patient extends User {
  constructor(
    public id: number,
    public email: string,
    public username: string,
    public phoneNumber: string,
    public dateOfBirth: Date,
    public address: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {
    super(id, email, username, "patient", undefined, phoneNumber, address, createdAt, updatedAt);
  }

  get age(): number {
    const today = new Date();
    let age = today.getFullYear() - this.dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - this.dateOfBirth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < this.dateOfBirth.getDate())) {
      age--;
    }

    return age;
  }
}
