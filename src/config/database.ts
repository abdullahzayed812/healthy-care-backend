import dotenv from "dotenv";
dotenv.config();

export interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  connectionLimit?: number;
}

export const databaseConfig: DatabaseConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "clinic_management",
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || "10"),
};
