import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../env/index.ts";
import { R2StorageService } from "../storage/r2-service.ts";

interface GetFileServiceRequest {
  fileName: string;
}

interface GetFileServiceResponse {
  fileUrl: string;
}

export class GetFileService {
  private client: S3Client;

  constructor() {
    const r2StorageService = new R2StorageService();
    this.client = r2StorageService.clientInstance;
  }

  async execute({
    fileName,
  }: GetFileServiceRequest): Promise<GetFileServiceResponse> {
    const bucket = env.AWS_BUCKET_NAME;
    const key = fileName;

    const uploadParams = {
      Bucket: bucket,
      Key: key,
    };

    await this.client.send(new GetObjectCommand(uploadParams));

    return {
      fileUrl: `${env.AWS_URL_PUBLIC_BUCKET}/${fileName}`,
    };
  }
}
