import { User } from "../../../core/entities/User";
import { DatabaseError } from "../../../utils/errors/DatabaseErrors";
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
      return new User(userData.id, userData.email, userData.username, userData.role, userData.password);
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new DatabaseError("Failed to query user by email", "FIND_USER_DB_ERROR");
    }
  }

  // Register a new user
  async createUser(user: Omit<User, "id">): Promise<User | null> {
    try {
      const result = await this.dbConnection.query<any>(
        `INSERT INTO users (email, password, username, role) VALUES (?, ?, ?, ?)`,
        [user.email, user.password, user.username, user.role]
      );

      if (!result.insertId) {
        return null; // Insertion failed
      }

      const id = result.insertId;
      return new User(id, user.email, user.username, user.role);
    } catch (error) {
      console.error("Error creating user:", error);
      throw new DatabaseError("Failed to create user", "CREATE_USER_DB_ERROR");
    }
  }
}
