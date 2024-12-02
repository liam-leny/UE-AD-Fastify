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
  let { id, state, description, assignedTo } = request.body as {
    id: number;
    state?: ItemState;
    description: string;
    assignedTo?: string;
  };

  if(!state){
    state = ItemState.PENDING;
  }

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

  const newItem = { id, state, description, assignedTo };
  list.items.push(newItem);

  await this.level.listsdb.put(listId, JSON.stringify(list));

  reply.code(201).send({ message: "Item added successfully", data: newItem });
}

export async function updateItemInList(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id: listId, itemId } = request.params as {
    id: string;
    itemId: string;
  };
  const { state, description, assignedTo } = request.body as {
    state: ItemState;
    description: string;
    assignedTo: string;
  };

  const listRaw = await this.level.listsdb.get(listId);
  if (!listRaw) {
    return reply.code(404).send({ message: "List not found" });
  }

  const list = JSON.parse(listRaw) as ITodoList;

  if (!list.items) {
    return reply.code(404).send({ message: "No items found in the list" });
  }

  const itemIndex = list.items.findIndex(
    (item) => item.id.toString() === itemId
  );
  if (itemIndex === -1) {
    return reply.code(404).send({ message: "Item not found" });
  }

  const updatedItem = {
    ...list.items[itemIndex],
    state: state || list.items[itemIndex].state,
    description: description || list.items[itemIndex].description,
    assignedTo: assignedTo || list.items[itemIndex].assignedTo,
  };
  list.items[itemIndex] = updatedItem;

  await this.level.listsdb.put(listId, JSON.stringify(list));

  reply.send({ message: "Item updated successfully", data: updatedItem });
}

export async function deleteItemFromList(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id: listId, itemId } = request.params as {
    id: string;
    itemId: string;
  };

  const listRaw = await this.level.listsdb.get(listId);
  if (!listRaw) {
    return reply.code(404).send({ message: "List not found" });
  }

  const list = JSON.parse(listRaw) as ITodoList;

  if (!list.items) {
    return reply.code(404).send({ message: "No items found in the list" });
  }

  const itemIndex = list.items.findIndex(
    (item) => item.id.toString() === itemId
  );
  if (itemIndex === -1) {
    return reply.code(404).send({ message: "Item not found" });
  }

  list.items.splice(itemIndex, 1);

  await this.level.listsdb.put(listId, JSON.stringify(list));

  reply.send({ message: "Item deleted successfully" });
}

export async function markListAsDone(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id: listId } = request.params as { id: string };

  const listRaw = await this.level.listsdb.get(listId);
  if (!listRaw) {
    return reply.code(404).send({ message: "List not found" });
  }

  const list = JSON.parse(listRaw) as ITodoList;

  if (!list.items || list.items.length === 0) {
    return reply.code(400).send({ message: "List has no items to mark as done" });
  }

  list.items = list.items.map((item) => ({
    ...item,
    state: ItemState.DONE,
  }));

  await this.level.listsdb.put(listId, JSON.stringify(list));

  reply.send({
    message: "All items in the list marked as DONE",
    data: list,
  });
}
