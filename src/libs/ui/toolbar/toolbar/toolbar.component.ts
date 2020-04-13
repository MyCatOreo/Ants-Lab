import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ToolbarConfig } from "src/types/toolbar-config";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  @Input() toolbarConfig: ToolbarConfig[];
  @Output() onToolbarButtonClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  handleButtonClick(event) {
    //TODO Some buttons may belong to toolbar... check if this button asks toolbar to do something...
    this.onToolbarButtonClick.emit(event);
  }
}
