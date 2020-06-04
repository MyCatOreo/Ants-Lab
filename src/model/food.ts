export interface Food {
  id: string;
  name: string;
  stimulusC: number;
}

export const foodWikiConfig = [
  { field: "id", display: true },
  { field: "name", display: true },
  { field: "stimulusC", display: true },
];
