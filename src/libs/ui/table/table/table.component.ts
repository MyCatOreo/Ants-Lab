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

  selectedId: number;

  constructor() {}

  ngOnInit(): void {}

  selectItem(id: number) {
    this.selectedId = id;
    this.itemSelected.emit(id);
  }
}
