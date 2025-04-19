import { sql } from "./database/client.ts";
import { Transform } from "stream";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";

const query = sql`
    SELECT * FROM products WHERE price_in_cents > 1000
`;

const cursor = query.cursor(500);

// for await (const row of cursor) {
//     console.table(row)
//
//     break;
// }

const exampleStream = new Transform({
  objectMode: true,
  transform(chunk, _, callback) {
    for (const row of chunk) {
      console.log(row);

      this.push(JSON.stringify({ id: row.id, name: row.name }).concat("\n"));
    }

    callback();
  },
});

exampleStream.on("data", (data) => {
  console.log("Data from stream:", data.toString());
});

exampleStream.on("end", () => {
  console.log("Stream ended");
});

exampleStream.on("pipe", (src) => {
  console.log("Stream piped from:", src);
});

await pipeline(
  cursor,
  exampleStream,
  createWriteStream("./dashboard.csv", "utf-8"),
);

await sql.end();
