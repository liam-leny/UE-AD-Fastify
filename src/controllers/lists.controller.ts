import { FastifyReply, FastifyRequest } from "fastify";
import { ItemState, ITodoList } from "../interfaces";

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

export async function putList(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: number };
  const list = request.body as Omit<ITodoList, "id">;

  const updatedList: ITodoList = { id, ...list };
  await this.level.listsdb.put(id.toString(), JSON.stringify(updatedList));

  reply
    .code(200)
    .send({ message: "List updated successfully", data: updatedList });
}

export async function addItemToList(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id: listId } = request.params as { id: string };
  const { id, state, description } = request.body as {
    id: string;
    state: ItemState;
    description: string;
  };

  const listRaw = await this.level.listsdb.get(listId);
  if (!listRaw) {
    return reply.code(404).send({ message: "List not found" });
  }

  const list = JSON.parse(listRaw) as ITodoList;

  if (!list.items) {
    list.items = [];
  }

  const itemExists = list.items.some((item) => item.id === id);
  if (itemExists) {
    return reply.code(400).send({ message: "Item already exists" });
  }

  const newItem = { id, state, description };
  list.items.push(newItem);

  await this.level.listsdb.put(listId, JSON.stringify(list));

  reply.code(201).send({ message: "Item added successfully", data: newItem });
}
