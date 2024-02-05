import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().min(1),
  GOOGLE_ID: zod.string().min(1),
  GOOGLE_SECRET: zod.string().min(1),
  NEXTAUTH_SECRET: zod.string().min(1),
});

export const env = envSchema.parse(process.env);
