import { FastifyReply, FastifyRequest } from "fastify";
import { redisClient } from "../db";
import { ItemState, ITodoList } from "../interfaces";

export async function listLists(request: FastifyRequest, reply: FastifyReply) {
  const client = await redisClient();
  const keys = await client.keys("todo-list:*"); 

  const result: ITodoList[] = [];
  for (const key of keys) {
    const value = await client.hGetAll(key);
    if (value) {
      const parsedValue = JSON.parse(JSON.stringify(value));
      parsedValue.items = parsedValue.items ? JSON.parse(parsedValue.items) : [];
      result.push(parsedValue as ITodoList);
    }
  }

  reply.send(result);
}

export async function addList(request: FastifyRequest, reply: FastifyReply) {
  const client = await redisClient();
  const list = request.body as ITodoList;

  const keys = await client.keys("todo-list:*");
  const maxId = keys
    .map((key) => parseInt(key.split(":")[1], 10))
    .reduce((max, id) => Math.max(max, id), 0);
  const newId = maxId + 1;

  list.id = newId;

  const redisObject = {
    id: String(list.id),
    name: String(list.name),
    items: JSON.stringify(list.items || []),
  };

  await client.hSet(`todo-list:${list.id}`, redisObject);

  reply.code(201).send({ message: "List added successfully", data: list });
}

export async function putList(request: FastifyRequest, reply: FastifyReply) {
  const client = await redisClient();
  const { id } = request.params as { id: number };
  const list = request.body as Omit<ITodoList, "id">;

  const updatedList: ITodoList = { id, ...list };

  const redisObject = {
    id: String(updatedList.id),
    name: String(updatedList.name),
    items: JSON.stringify(updatedList.items || []),
  };

  await client.hSet(`todo-list:${id}`, redisObject);

  reply.code(200).send({ message: "List updated successfully", data: updatedList });
}

export async function addItemToList(request: FastifyRequest, reply: FastifyReply) {
  const client = await redisClient();
  const { id: listId } = request.params as { id: string };
  const { state, description, assignedTo } = request.body as {
    state?: ItemState;
    description: string;
    assignedTo?: string;
  };

  const listRaw = await client.hGetAll(`todo-list:${listId}`);
  if (!listRaw) {
    return reply.code(404).send({ message: "List not found" });
  }

  const list = {
    ...listRaw,
    items: listRaw.items ? JSON.parse(listRaw.items) : [],
  } as ITodoList;

  const newId = list.items.reduce((max, item) => Math.max(max, item.id), 0) + 1;

  const newItem = { id: newId, state: state || ItemState.PENDING, description, assignedTo };
  list.items.push(newItem);

  await client.hSet(`todo-list:${listId}`, {
    ...listRaw,
    items: JSON.stringify(list.items),
  });

  reply.code(201).send({ message: "Item added successfully", data: newItem });
}

export async function updateItemInList(request: FastifyRequest, reply: FastifyReply) {
  const client = await redisClient();
  const { id: listId, itemId } = request.params as { id: string; itemId: string };
  const { state, description, assignedTo } = request.body as {
    state: ItemState;
    description: string;
    assignedTo: string;
  };

  const listRaw = await client.hGetAll(`todo-list:${listId}`);
  if (!listRaw) {
    return reply.code(404).send({ message: "List not found" });
  }

  const list = {
    ...listRaw,
    items: listRaw.items ? JSON.parse(listRaw.items) : [], // Initialiser items si nécessaire
  } as ITodoList;

  const itemIndex = list.items.findIndex((item) => item.id === parseInt(itemId, 10));
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

  await client.hSet(`todo-list:${listId}`, {
    ...listRaw,
    items: JSON.stringify(list.items),
  });

  reply.send({ message: "Item updated successfully", data: updatedItem });
}

export async function deleteItemFromList(request: FastifyRequest, reply: FastifyReply) {
  const client = await redisClient();
  const { id: listId, itemId } = request.params as { id: string; itemId: string };

  const listRaw = await client.hGetAll(`todo-list:${listId}`);
  if (!listRaw) {
    return reply.code(404).send({ message: "List not found" });
  }

  const list = {
    ...listRaw,
    items: listRaw.items ? JSON.parse(listRaw.items) : [], // Initialiser items si nécessaire
  } as ITodoList;

  const itemIndex = list.items.findIndex((item) => item.id === parseInt(itemId, 10));
  if (itemIndex === -1) {
    return reply.code(404).send({ message: "Item not found" });
  }

  list.items.splice(itemIndex, 1);

  await client.hSet(`todo-list:${listId}`, {
    ...listRaw,
    items: JSON.stringify(list.items),
  });

  reply.send({ message: "Item deleted successfully" });
}

export async function markListAsDone(request: FastifyRequest, reply: FastifyReply) {
  const client = await redisClient();
  const { id: listId } = request.params as { id: string };

  const listRaw = await client.hGetAll(`todo-list:${listId}`);
  if (!listRaw) {
    return reply.code(404).send({ message: "List not found" });
  }

  const list = {
    ...listRaw,
    items: listRaw.items ? JSON.parse(listRaw.items) : [], // Initialiser items si nécessaire
  } as ITodoList;

  if (!list.items || list.items.length === 0) {
    return reply.code(400).send({ message: "List has no items to mark as done" });
  }

  list.items = list.items.map((item) => ({
    ...item,
    state: ItemState.DONE,
  }));

  await client.hSet(`todo-list:${listId}`, {
    ...listRaw,
    items: JSON.stringify(list.items),
  });

  reply.send({
    message: "All items in the list marked as DONE",
    data: list,
  });
}
