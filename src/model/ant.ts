import { Task } from "./_index";
import { Food } from "./food";
import { Location } from "./location";

export interface Ant {
  id: string;
  location: Location;
  taskCurrent: Task;
  memory: any[]; //TODO
  food?: Food;
}
