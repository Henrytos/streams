import fastify from "fastify";
import { env } from "../env/index.ts";
import { ServerControllers } from "./controllers/index.ts";

import cors from "@fastify/cors";

const app = fastify();

await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
});

app.register(ServerControllers);

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀🚀 Server is running on port ${env.PORT} 🚀🚀`);
  });
