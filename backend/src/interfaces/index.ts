export interface ITodoList {
  id: number;
  name: string;
  items: ITodoItem[];
}

export interface ITodoItem {
  id: number;
  state: ItemState;
  description: string;
  assignedTo?: string;
}

export enum ItemState {
  PENDING = "PENDING",
  IN_PROGRESS = "IN-PROGRESS",
  DONE = "DONE",
}
