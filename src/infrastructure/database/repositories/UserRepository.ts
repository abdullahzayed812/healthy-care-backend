import { RegisterRequest, RegisterResponse } from "../../../core/dto/auth.dto";
import { GetAllUsersResponse } from "../../../core/dto/user.dto";
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

  findAll(): Promise<GetAllUsersResponse> {
    throw new Error("Method not implemented.");
  }

  async findAllUsersWithDetails(): Promise<User[]> {
    const query = `
      SELECT 
        u.id, u.email, u.username, u.role, u.phone_number, u.created_at, u.updated_at,
        d.specialty, d.bio, d.experience, d.reviews,
        p.date_of_birth, p.gender
      FROM users u
      LEFT JOIN doctors d ON u.id = d.id
      LEFT JOIN patients p ON u.id = p.id
    `;

    const rows = await this.dbConnection.query<any[]>(query);

    return rows;
  }

  public async create(data: RegisterRequest): Promise<User | null> {
    const { email, password, username, role, specialty, bio, dateOfBirth, gender } = data;

    try {
      const result = await this.dbConnection.query<any>(
        `INSERT INTO users (email, password, username, role) VALUES (?, ?, ?, ?)`,
        [email, password, username, role]
      );

      if (!result.insertId) {
        return null; // Insertion failed
      }

      const id = result.insertId;

      if (role === "doctor") {
        await this.dbConnection.query<any>("INSERT INTO doctors (id, specialty, bio) VALUES (?, ?, ?)", [
          id,
          specialty,
          bio,
        ]);
      } else if (role === "patient") {
        await this.dbConnection.query<any>("INSERT INTO patients (id, date_of_birth, gender) VALUES (?, ?, ?)", [
          id,
          dateOfBirth,
          gender,
        ]);
      }

      return new User(id, email, username, role);
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
