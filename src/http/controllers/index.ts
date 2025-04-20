import { FastifyInstance } from "fastify";
import { ListProductsController } from "./list-products-controller.ts";
import { GetUrlProductsCSVController } from "./get-url-products-csv-controller.ts";

export async function ServerControllers(app: FastifyInstance) {
  app.get("/products", ListProductsController);
  app.get("/products/url-csv", GetUrlProductsCSVController);
}
