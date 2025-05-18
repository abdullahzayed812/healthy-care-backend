import { User } from "../../../core/entities/User";
import { MySqlConnection } from "../connections/MySqlConnection";

export class AuthRepository {
  private dbConnection: MySqlConnection;

  constructor(dbConnection: MySqlConnection) {
    this.dbConnection = dbConnection;
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    try {
      const result = await this.dbConnection.query<any[]>("SELECT * FROM users WHERE email = ?", [email]);

      if (result.length === 0) {
        return null; // No user found, return null
      }

      const userData = result[0];
      return new User(
        userData.id,
        userData.email,
        userData.first_name,
        userData.last_name,
        userData.role,
        userData.password
      );
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error("Database query failed. Please try again later.");
    }
  }

  // Register a new user
  async createUser(user: Omit<User, "id">): Promise<User | null> {
    try {
      const result = await this.dbConnection.query<any>(
        `INSERT INTO users (email, password, first_name, last_name, role) VALUES (?, ?, ?, ?, ?)`,
        [user.email, user.password, user.firstName, user.lastName, user.role]
      );

      if (!result.insertId) {
        return null; // Insertion failed
      }

      const id = result.insertId;
      return new User(id, user.email, user.firstName, user.lastName, user.role);
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to register user. Please try again later.");
    }
  }
}
