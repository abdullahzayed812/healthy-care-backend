import { User } from "./User";

export class Doctor extends User {
  constructor(
    public id: number,
    public email: string,
    public username: string,
    public phoneNumber: string,
    public specialty: string,
    public bio: string
  ) {
    super(id, email, username, "doctor");
    this.specialty = specialty;
  }
}
