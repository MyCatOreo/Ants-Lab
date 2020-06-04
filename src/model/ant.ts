import { Task } from "./_index";
import { Food } from "./food";

export interface Ant {
  id: string;
  location: Location;
  taskCurrent: Task;
  memory: any[]; //TODO
  food: Food;
}
