import { FastifyReply, FastifyRequest } from "fastify";
import { ITodoList } from "../interfaces";

export async function listLists(request: FastifyRequest, reply: FastifyReply) {
  console.log("DB status", this.level.listsdb.status);
  const listsIter = this.level.listsdb.iterator();

  const result: ITodoList[] = [];
  for await (const [key, value] of listsIter) {
    result.push(JSON.parse(value));
  }
  reply.send(result);
}

export async function addList(request: FastifyRequest, reply: FastifyReply) {
  const list = request.body as ITodoList;

    const result = await this.level.listsdb.put(
    list.id.toString(),
    JSON.stringify(list)
  );
  reply.code(201).send({ message: "List added successfully", data: list });
}
