import { Task } from "./_index";
import { Food } from "./food";

export interface Ant {
  id: number;
  location: Location;
  taskCurrent: Task;
  memory: any[]; //TODO
  food: Food;
}
