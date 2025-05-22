import { User } from "../../../core/entities/User";
import { IUserRepository } from "../../../core/interfaces/repositories/IUserRepository";
import { DatabaseError } from "../../../utils/errors/DatabaseErrors";
import { MySqlConnection } from "../connections/MySqlConnection";

export class UserRepository implements IUserRepository {
  private dbConnection: MySqlConnection;

  constructor(dbConnection: MySqlConnection) {
    this.dbConnection = dbConnection;
  }

  findById(id: number): Promise<User | null> {
    throw new Error("Method not implemented.");
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
      throw new DatabaseError("Failed to find user by email", "FIND_USER_DB_ERROR");
    }
  }

  findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  create(entity: Partial<User>): Promise<User> {
    throw new Error("Method not implemented.");
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
      await this.dbConnection.query<any>("INSERT INTO doctors (id) VALUES (?)", [id]);

      return new User(id, user.email, user.username, user.role);
    } catch (error) {
      console.error("Error creating user:", error);
      throw new DatabaseError("Failed to create user", "CREATE_USER_DB_ERROR");
    }
  }

  update(id: number, entity: Partial<User>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async uploadAvatar(userId: string, avatarPath: string): Promise<boolean> {
    try {
      const result = await this.dbConnection.query<any>("UPDATE users SET avatar = ? WHERE id = ?", [
        avatarPath,
        userId,
      ]);

      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error upload user avatar:", error);
      throw new DatabaseError("Failed upload user avatar", "UPLOAD_AVATAR_DB_ERROR");
    }
  }
}
