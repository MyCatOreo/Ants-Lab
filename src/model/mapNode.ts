export interface MapNode {
  x: number;
  y: number;
  type?: "blank" | "water" | "nest";
  ant?: number;
  food?: number;
}
