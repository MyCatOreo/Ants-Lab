export interface Task {
  id: string;
  name: string;
  description: string;
}

export const taskWikiConfig = [
  { field: "id", display: true },
  { field: "name", display: true },
  { field: "description", display: true },
];
