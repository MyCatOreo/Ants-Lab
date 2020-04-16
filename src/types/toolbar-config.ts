export interface ToolbarConfig {
  name: string;
  type: "button" | "filter" | "search";
  label: string;
  icon?: string;
  options?: any[];
  rightAlign?: boolean;
}
