import dotenv from "dotenv";
import { createServer } from "./server";
import { checkRequiredEnvVars } from "./utils/checkEnvVars";
import { container } from "./di/container";

dotenv.config();

(async () => {
  const { ENV, PORT } = process.env;

  checkRequiredEnvVars(["ENV", "PORT", "JWT_SECRET", "DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"]);

  await container.dbManager.runMigrations();
  await container.dbManager.runSeeds();

  const { httpServer } = await createServer();

  httpServer.listen(PORT, () => {
    console.log(`✅ Listening on port ${PORT} in ${ENV} environment.`);
  });
})();
