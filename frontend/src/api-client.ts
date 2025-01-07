import { ItemsApi, ListsApi, Def2 as ItemState } from "@liam8/todo-list-client";
import { ITodoList, ITodoItem } from "./api-types";
import axios from "axios";

const API_URL = "http://localhost:3000";

const listsApi = new ListsApi(
    {
        isJsonMime: (mime: string) => mime.startsWith('application/json')
    },
    API_URL,
    axios,
)

const itemsApi = new ItemsApi(
  {
      isJsonMime: (mime: string) => mime.startsWith('application/json')
  },
  API_URL,
  axios,
)


export const apiClient = {
  getLists: async () => {
    return listsApi.listsGet().then(r => r.data)
  },
  
  addList: async (listName: string) => {
    const newList: ITodoList = {
      id: 0, //Id temporaire sera généré aléatoirement par le backend
      name: listName,
      items: [], 
    };

    return listsApi.listsPost(newList).then(r => r.data)
  },

  getTodos: async (listName: string): Promise<ITodoItem[]> => {
    const response = await listsApi.listsGet();
    const list = response.data.find((list: ITodoList) => list.name === listName); 
    
    if (!list || !list.items) {
        return []; 
    }

    return list.items.map((item: ITodoItem) => item); 
  },

  addTodo: async (listName: string, todo: string) => {
    const response = await listsApi.listsGet();
    const list = response.data.find((list: ITodoList) => list.name === listName);
    if (!list) {
      return []; 
    }
    
    const newItem: ITodoItem = {
      id: 0, //Id temporaire sera généré aléatoirement par le backend 
      description: todo,
      state : ItemState.Pending
    };
    return itemsApi.listsIdItemsPost(String(list.id), newItem).then(r => r.data);
  },
};
