import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  @Input() tableData: any[];
  @Input() tableConfig: any;

  @Output() itemSelected: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
