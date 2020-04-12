export interface ToolbarConfig {
  name: string;
  type: "button" | "filter" | "search";
  label: string;
  icon?: string;
  options?: any[];
  display: boolean;
  align?: "left" | "right" | undefined;
  onClick?: {};
  onBlur?: {};
  onSelect?: {};
}
