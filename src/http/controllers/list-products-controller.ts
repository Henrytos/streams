import { FastifyReply, FastifyRequest } from "fastify";
import { sql } from "../../database/client.ts";

export async function ListProductsController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const products = await sql`SELECT * FROM products LIMIT 10;`;

  reply.send({
    products,
  });
}
