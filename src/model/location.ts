export interface Location {
  x: number;
  y: number;
  z: number;
}

export const randomLocation = (maxX, maxY): Location => {
  return { x: Math.random() * maxX, y: Math.random() * maxY, z: 0 };
};
