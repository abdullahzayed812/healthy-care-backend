export type UserRole = "admin" | "patient" | "doctor";

export class User {
  constructor(
    public id: number,
    public email: string,
    public firstName: string,
    public lastName: string,
    public role: UserRole,
    public password?: string,
    public phone?: string,
    public address?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  toSafeObject(): User {
    return new User(this.id, this.email, this.firstName, this.lastName, this.role);
  }
}
