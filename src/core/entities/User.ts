export class User {
  constructor(
    public id: number,
    public email: string,
    public firstName: string,
    public lastName: string,
    public password?: string
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
