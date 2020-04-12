import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  @Input() toolbarConfig: ToolbarConfig[];

  constructor() {}

  ngOnInit(): void {}
}

interface ToolbarConfig {
  name: string;
  type: "button" | "filter" | "search";
  label: "";
  icon: string;
  options: any[];
  display: boolean;
  align: "left" | "right";
  onClick: (e) => {};
  onBlur: (e) => {};
  onSelect: (e) => {};
}
