import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_ACCOUNT_ID: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_URL_PUBLIC_BUCKET: z.string().url(),
});

const envParse = envSchema.safeParse(process.env);

if (envParse.success === false) {
  console.error("Invalid environment variables", envParse.error.format());
  throw new Error("Invalid environment variables");
}

export const env = envParse.data;
