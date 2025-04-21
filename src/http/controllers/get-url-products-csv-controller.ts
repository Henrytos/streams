import { FastifyReply, FastifyRequest } from "fastify";
import { GetFileService } from "../../service/get-file-service.ts";

export async function GetUrlProductsCSVController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const getFileService = new GetFileService();

  const { fileUrl } = await getFileService.execute({
    fileName: "dashboard.csv",
  });

  reply.send({
    fileUrl,
  });
}
