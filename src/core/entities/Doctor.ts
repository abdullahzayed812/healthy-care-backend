import { User } from "./User";

export class Doctor extends User {
  constructor(
    public id: number,
    public email: string,
    public username: string,
    public phoneNumber: string,
    public specialty: string,
    public bio: string,
    public nextAvailable?: string,
    public experience?: number,
    public reviews?: number
  ) {
    super(id, email, username, "doctor", undefined, phoneNumber);
    this.specialty = specialty;
  }
}
