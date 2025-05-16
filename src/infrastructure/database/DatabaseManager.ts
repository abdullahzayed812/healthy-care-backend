import fs from "fs";
import path from "path";
import { MySqlConnection } from "./connections/MySqlConnection";
import { databaseConfig } from "../../config/database";
import { fileURLToPath } from "node:url";

interface MigrationsLog {
  id: number;
  name: string;
  applied_at: string;
}

interface SeedsLogs {
  id: number;
  name: string;
  applied_at: string;
}

export class DatabaseManager {
  private readonly __filename = fileURLToPath(import.meta.url);
  private readonly __dirname = path.dirname(this.__filename);

  constructor(private dbConnection: MySqlConnection) {
    dbConnection = MySqlConnection.getInstance(databaseConfig);
  }

  public async runMigrations() {
    await this.dbConnection.query(`
      CREATE TABLE IF NOT EXISTS migrations_log (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const migrationPath = path.join(this.__dirname, "migrations");
    const files = fs.readdirSync(migrationPath).sort();

    for (const file of files) {
      const rows = await this.dbConnection.query<MigrationsLog[]>("SELECT 1 FROM migrations_log WHERE name = ?", [
        file,
      ]);

      if (rows.length === 0) {
        const sql = fs.readFileSync(path.join(migrationPath, file), "utf8");
        console.log(`▶ Running migration: ${file}`);
        await this.dbConnection.query(sql);
        await this.dbConnection.query("INSERT INTO migrations_log (name) VALUES (?)", [file]);
      } else {
        console.log(`✔ Skipping already applied migration: ${file}`);
      }
    }

    console.log("✅ Migrations check completed.");
  }

  public async runSeeds() {
    await this.dbConnection.query(`
      CREATE TABLE IF NOT EXISTS seeds_log (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const seedPath = path.join(this.__dirname, "seeds");
    const files = fs.readdirSync(seedPath).sort();

    for (const file of files) {
      const rows = await this.dbConnection.query<SeedsLogs[]>("SELECT 1 FROM seeds_log WHERE name = ?", [file]);

      if (rows.length === 0) {
        const sql = fs.readFileSync(path.join(seedPath, file), "utf8");
        console.log(`▶ Seeding data: ${file}`);
        await this.dbConnection.query(sql);
        await this.dbConnection.query("INSERT INTO seeds_log (name) VALUES (?)", [file]);
      } else {
        console.log(`✔ Skipping already applied seed: ${file}`);
      }
    }

    console.log("✅ Seeding check completed.");
  }
}
