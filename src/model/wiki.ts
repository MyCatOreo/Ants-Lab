import { Task, Ant } from "./_index";
import { Food } from "./food";

export interface Wiki {
  selectedTable: string | undefined;
  selectedItem: number | undefined;
  food: { items: Food[] };
  task: { items: Task[] };
}

export const initWiki = {
  selectedTable: "",
  selectedItem: undefined,
  food: { items: [] },
  task: { items: [] },
};

export enum WikiTables {
  Food = "food",
  Task = "task",
}
