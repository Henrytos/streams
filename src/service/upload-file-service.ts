import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "../env/index.ts";
import { R2StorageService } from "../storage/r2-service.ts";

interface UploadfileServiceRequest {
  file: Buffer;
  fileName: string;
  fileType: string;
}

export class UploadfileService {
  private client: S3Client;

  constructor() {
    const r2StorageService = new R2StorageService();
    this.client = r2StorageService.clientInstance;
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

    const data = await this.client.send(new PutObjectCommand(uploadParams));

    return data;
  }
}
