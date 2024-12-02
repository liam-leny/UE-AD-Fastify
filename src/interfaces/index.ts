export interface ITodoList {
  id: number;
  name: string;
  items?: { id: number; state: ItemState; description: string }[];
}

export enum ItemState {
  PENDING = "PENDING",
  IN_PROGRESS = "IN-PROGRESS",
  DONE = "DONE",
}
