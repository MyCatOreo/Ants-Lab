import { Task, Ant } from "./_index";
import { Food } from "./food";

export interface Wiki {
  id: number;
  food: { foods: Food[] };
  task: { tasks: Task[] };
}
