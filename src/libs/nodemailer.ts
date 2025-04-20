import { createTransport } from "nodemailer";
import { env } from "../env/index.ts";

export const nodemailer: ReturnType<typeof createTransport> = createTransport({
  host: env.SMTP_HOST,
  secure: false,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});
