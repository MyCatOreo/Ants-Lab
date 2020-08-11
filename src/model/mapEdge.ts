import { MapNode } from "./mapNode";

export interface MapEdge {
  id: number;
  nodeA: MapNode;
  nodeB: MapNode;
  pheromone: number; //TODO doesn't belong here
  distance: number;
}

const mockup = {
  id: "1",
  nodeA: { x: 1, y: 1, type: "blank" },
  nodeB: { x: 2, y: 1, type: "blank" },
  pheromone: 0,
  distance: 1,
};
