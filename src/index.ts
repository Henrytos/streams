import { sql } from "./database/client.ts";
import { Transform } from "stream";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";
import { UploadfileService } from "./service/upload-file-service.ts";
import { readFile } from "node:fs/promises";
import { GetFileService } from "./service/get-file-service.ts";
import { SendEmailService } from "./service/send-email-service.ts";
import { env } from "./env/index.ts";

const query = sql`
    SELECT * FROM products WHERE price_in_cents > 1000 LIMIT 100
`;

const cursor = query.cursor(10);

const transformStream = new Transform({
  objectMode: true,
  transform(chunk, _, callback) {
    for (const row of chunk) {
      console.log(row);

      this.push(JSON.stringify({ id: row.id, name: row.name }).concat("\n"));
    }

    callback();
  },
});

const writeStream = createWriteStream("./dashboard.csv", {
  encoding: "utf-8",
});

writeStream.on("finish", async () => {
  console.log("File written successfully");

  const uploadfileService = new UploadfileService();
  const fileName = "dashboard.csv";
  const fileType = "text/csv";
  const file = await readFile("./dashboard.csv");

  await uploadfileService.execute({
    file,
    fileName,
    fileType,
  });

  const getFileService = new GetFileService();

  const { fileUrl } = await getFileService.execute({
    fileName,
  });

  console.log({ fileUrl });

  const sendEmailService = new SendEmailService();
  await sendEmailService.execute({
    from: env.ENTERPRISE_EMAIL_CONTACT,
    to: "jhon-doe@gmail.com",
    subject: "Dashboard CSV",
    html: `csv url link: <a href='${fileUrl}' target='__blank'>csv click</a>`,
  });

  await new Promise((resolve) => {
    setTimeout(() => resolve, 5_000); // wait 5 seconds
  });

  await sql.end();
});

await pipeline(cursor, transformStream, writeStream);

await sql.end();
