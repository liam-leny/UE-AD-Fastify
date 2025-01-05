import { ItemsApi, ListsApi, Def2 as ItemState } from "@liam8/todo-list-client";
import { ITodoList, ITodoItem } from "./api-types";
import axios from "axios";

const listsApi = new ListsApi(
    {
        isJsonMime: (mime: string) => mime.startsWith('application/json')
    },
    'http://localhost:3000',
    axios,
)

const itemsApi = new ItemsApi(
  {
      isJsonMime: (mime: string) => mime.startsWith('application/json')
  },
  'http://localhost:3000',
  axios,
)


export const apiClient = {
  getLists: async () => {
    return listsApi.listsGet().then(r => r.data)
  },
  
  addList: async (listName: string) => {
    const newList: ITodoList = {
      id: 0, //Id temporaire généré aléatoirement par le backend
      name: listName,
      items: [], 
    };

    return listsApi.listsPost(newList).then(r => r.data)
  },

  getTodos: async (listName: string): Promise<string[]> => {
    const response = await listsApi.listsGet();
    const list = response.data.find((list: ITodoList) => list.name === listName); 
    
    if (!list || !list.items) {
        return []; 
    }

    return list.items.map((item: ITodoItem) => item.description); 
  },

  addTodo: async (listName: string, todo: string) => {
    const response = await listsApi.listsGet();
    const list = response.data.find((list: ITodoList) => list.name === listName);
    if (!list) {
      return []; 
    }
    
    const newItem: ITodoItem = {
      id: 0, //Id temporaire généré aléatoirement par le backend 
      description: todo,
      state : ItemState.Pending
    };
    return itemsApi.listsIdItemsPost(String(list.id),newItem).then(r => r.data);
  },
};
