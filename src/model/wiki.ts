import { Task, Ant } from "./_index";
import { Food } from "./food";

export interface Wiki {
  selectedTable: string | undefined;
  selectedItemId: number | undefined;
  food: { items: Food[] };
  task: { items: Task[] };
}

export const initWiki = {
  selectedTable: "food",
  selectedItemId: 1,
  food: { items: undefined },
  task: { items: undefined },
};

export enum WikiTables {
  Food = "food",
  Task = "task",
}
