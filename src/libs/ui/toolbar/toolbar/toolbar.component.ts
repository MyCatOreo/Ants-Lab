import { Component, OnInit, Input } from "@angular/core";
import { ToolbarConfig } from "src/types/toolbar-config";

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
