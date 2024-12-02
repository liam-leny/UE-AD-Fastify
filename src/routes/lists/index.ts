import { FastifyInstance } from "fastify";
import * as listsController from "../../controllers/lists.controller";
import * as schema from "../../schemas/lists.schema";

async function lists(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: schema.listResponseSchema,
        },
      },
    },
    listsController.listLists
  );

  fastify.post(
    "/",
    {
      schema: schema.addListSchema,
    },
    listsController.addList
  );

  fastify.put(
    "/:id",
    {
      schema: schema.updateListSchema,
    },
    listsController.putList
  );

  fastify.post(
    "/:id/items",
    {
      schema: schema.addItemSchema,
    },
    listsController.addItemToList
  );

  fastify.put(
    "/:id/items/:itemId",
    { schema: schema.updateItemSchema },
    listsController.updateItemInList
  );
  
  fastify.delete(
    "/:id/items/:itemId",
    { schema: schema.deleteItemSchema },
    listsController.deleteItemFromList
  );

}

export default lists;
