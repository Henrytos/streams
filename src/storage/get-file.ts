import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../env/index.ts";

interface GetFileServiceRequest {
  fileName: string;
}

export class GetFileService {
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

  async execute({ fileName }: GetFileServiceRequest) {
    const bucket = env.AWS_BUCKET_NAME;
    const key = fileName;

    const uploadParams = {
      Bucket: bucket,
      Key: key,
    };

    try {
      const data = await this.client.send(new GetObjectCommand(uploadParams));
      
      if(data.Body){
        data.Body.pipe(process.stdout); // Stream the file to stdout
      }

      return `${env.AWS_URL_PUBLIC_BUCKET}/${fileName}`;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Error uploading file");
    }
  }
}
