import { sql } from "./database/client.ts";
import { Transform } from "stream";
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { WriteStream } from "node:tty";
import { UploadfileService } from "./storage/upload-file.ts";
import { readFile } from "node:fs/promises";
import { GetFileService } from "./storage/get-file.ts";

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


const  writeStream= createWriteStream("./dashboard.csv", {
  encoding: "utf-8",
});

writeStream.on("finish",async ()=>{
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

  const getFileService = new GetFileService()
  
  const fileData = await getFileService.execute({
    fileName,
  });

  console.log(fileData);
  
  await sql.end();
})

await pipeline(
  cursor,
  transformStream,
  writeStream,
);

await sql.end();
