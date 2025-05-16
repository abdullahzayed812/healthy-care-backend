import { User } from "../../../core/entities/User";
import { MySqlConnection } from "../connections/MySqlConnection";

export class AuthRepository {
  private dbConnection: MySqlConnection;

  constructor(dbConnection: MySqlConnection) {
    this.dbConnection = dbConnection;
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    const result = await this.dbConnection.query<any[]>("SELECT * FROM users WHERE email = ?", [email]);

    if (result.length === 0) {
      return null;
    }

    const userData = result[0];
    return new User(userData.id, userData.email, userData.first_name, userData.last_name);
  }

  // Register a new user
  async createUser(user: Omit<User, "id">): Promise<User> {
    const result = await this.dbConnection.query<any>(
      `INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)`,
      [user.email, user.password, user.firstName, user.lastName]
    );

    const id = result.insertId;
    return new User(id, user.email, user.firstName, user.lastName);
  }
}
