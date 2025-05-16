import mysql, { PoolConnection } from "mysql2/promise";
import { DatabaseConfig } from "../../../config/database";

export class MySqlConnection {
  private static instance: MySqlConnection;
  private pool: mysql.Pool;

  private constructor(config: DatabaseConfig) {
    this.pool = mysql.createPool({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
      waitForConnections: true,
      connectionLimit: config.connectionLimit || 10,
      queueLimit: 0,
    });
  }

  public static getInstance(config: DatabaseConfig): MySqlConnection {
    if (!MySqlConnection.instance) {
      MySqlConnection.instance = new MySqlConnection(config);
    }
    return MySqlConnection.instance;
  }

  public getPool(): mysql.Pool {
    return this.pool;
  }

  public async query<T>(sql: string, params: any[] = []): Promise<T> {
    try {
      const [results] = await this.pool.execute(sql, params);
      return results as T;
    } catch (error) {
      console.error("❌ Database query error:", error);
      throw error;
    }
  }

  public async transaction<T>(callback: (conn: PoolConnection) => Promise<T>): Promise<T> {
    const conn = await this.pool.getConnection();
    try {
      await conn.beginTransaction();
      const result = await callback(conn);
      await conn.commit();
      return result;
    } catch (error) {
      await conn.rollback();
      console.error("Transaction failed:", error);
      throw error;
    } finally {
      conn.release();
    }
  }

  // await db.transaction(async (conn) => {
  //   await conn.execute("UPDATE users SET balance = balance - ? WHERE id = ?", [100, 1]);
  //   await conn.execute("UPDATE users SET balance = balance + ? WHERE id = ?", [100, 2]);
  // });

  public async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
    }
  }
}
