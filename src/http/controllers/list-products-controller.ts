import { FastifyReply, FastifyRequest } from "fastify";
import { sql } from "../../database/client.ts";

export async function ListProductsController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const products =
    await sql` SELECT * FROM products WHERE price_in_cents > 1000 LIMIT 10`;

  console.log(products);
  return reply.send({
    products,
  });
}
