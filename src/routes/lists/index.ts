import { FastifyInstance } from "fastify";
import * as listsController from "../../controllers/lists.controller";
import {
  addListSchema,
  listResponseSchema,
  updateListSchema,
} from "../../schemas/lists.schema";

async function lists(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: listResponseSchema,
        },
      },
    },
    listsController.listLists
  );

  fastify.post(
    "/",
    {
      schema: addListSchema,
    },
    listsController.addList
  );

  fastify.put(
    "/:id",
    {
      schema: updateListSchema,
    },
    listsController.putList
  );
}

export default lists;
