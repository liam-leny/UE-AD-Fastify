// import { ITodoList, TodoListStatus } from './api-types'
import { Def0, Def1, Def2, ItemsApi, ListsApi } from "todo-list-client";
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
    const newList: Def0 = {
      id: 0, //Id temporaire généré aléatoirement par le backend
      name: listName,
      items: [], 
    };

    return listsApi.listsPost(newList).then(r => r.data)
  },

  getTodos: async (listId: number): Promise<string[]> => {
    const response = await listsApi.listsGet() 
    const list = response.data.find((list: Def0) => list.id == listId); 
    
    if (!list || !list.items) {
        return []; 
    }

    return list.items.map((item: Def1) => item.description); 
  },

  addTodo: async (listId: number, todo: string) => {
    const response = await listsApi.listsGet();
    const list = response.data.find((list: Def0) => list.id == listId);
    if (!list) {
      return []; 
    }
    
    const newItem: Def1 = {
      id: 0, //Id temporaire généré aléatoirement par le backend 
      description: todo,
      state : Def2.Pending
    };
    return itemsApi.listsIdItemsPost(String(listId),newItem).then(r => r.data);
  },
};
