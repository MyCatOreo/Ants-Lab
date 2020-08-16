import { Task, Food, MapNode } from "./_index";

export interface Ant {
  id: string;
  location: MapNode;
  taskCurrent: Task;
  memory: any[]; //TODO
  food?: Food;
}
