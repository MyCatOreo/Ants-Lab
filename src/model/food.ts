export interface Food {
  id: number;
  name: string;
  stimulusC: number;
}

export const foodTableConfig = [
  { field: "id", display: true },
  { field: "name", display: true },
  { field: "stimulusC", display: true },
];

export const mockupFoods = [
  {
    id: 1,
    name: "Fresh Fruit",
    stimulusC: 1,
  },
  {
    id: 2,
    name: "Dead Insect",
    stimulusC: 2,
  },
  {
    id: 3,
    name: "Braedcrumb",
    stimulusC: 0.5,
  },
];
