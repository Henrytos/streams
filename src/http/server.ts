import fastify from "fastify";
import { env } from "../env/index.ts";
import { ServerControllers } from "./controllers/index.ts";

const app = fastify();

app.register(import("@fastify/cors"), {
  origin: "*",
});

app.register(ServerControllers);

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀🚀 Server is running on port ${env.PORT} 🚀🚀`);
  });
