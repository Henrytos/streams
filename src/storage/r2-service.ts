import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../env/index.ts";

export class R2StorageService {
  private client: S3Client;

  get clientInstance() {
    return this.client;
  }

  constructor() {
    const accessKeyId = env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = env.AWS_SECRET_ACCESS_KEY;
    const accountId = env.AWS_ACCOUNT_ID;

    this.client = new S3Client({
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      region: "auto",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }
}
