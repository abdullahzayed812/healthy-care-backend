export function checkRequiredEnvVars(requiredVars: string[]) {
  const missingVars = requiredVars.filter((key) => !process.env[key]);

  if (missingVars.length > 0) {
    console.error("🚨 Missing required environment variables:");
    missingVars.forEach((key) => console.error(` - ${key}`));
    process.exit(1);
  }
}
