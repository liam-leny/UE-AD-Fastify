import fp from "fastify-plugin";
import swagger, { FastifySwaggerOptions } from "@fastify/swagger";
import JsonSchemas from "../schemas/all.json";

export default fp<FastifySwaggerOptions>(async (fastify) => {
  fastify.register(swagger, {
    openapi: {
      info: {
        title: "Todo API",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server",
        },
      ],
    },
  });
  if (JsonSchemas.definitions) {
    for (const [schemaId, schemaDef] of Object.entries(
      JsonSchemas.definitions
    )) {
      fastify.addSchema({
        $id: schemaId,
        ...schemaDef,
      });
    }
  }
});
