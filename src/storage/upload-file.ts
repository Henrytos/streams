import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "../env/index.ts";

interface UploadfileServiceRequest {
  file: Buffer;
  fileName: string;
  fileType: string;
}

export class UploadfileService {
  private client: S3Client;

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

  async execute({ file, fileName, fileType }: UploadfileServiceRequest) {
    const bucket = env.AWS_BUCKET_NAME;
    const key = fileName;

    const uploadParams = {
      Bucket: bucket,
      Key: key,
      Body: file,
      ContentType: fileType,
    };

    try {
      const data = await this.client.send(new PutObjectCommand(uploadParams));
      return data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Error uploading file");
    }
  }
}
