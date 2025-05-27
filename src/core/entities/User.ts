export type UserRole = "admin" | "patient" | "doctor";

export class User {
  constructor(
    public id: number,
    public email: string,
    public username: string,
    public role: UserRole,
    public password?: string,
    public phoneNumber?: string,
    public address?: string,
    public createdAt?: string,
    public updatedAt?: string
  ) {}

  get fullName(): string {
    return this.username;
  }

  toSafeObject(): User {
    return new User(this.id, this.email, this.username, this.role);
  }
}
