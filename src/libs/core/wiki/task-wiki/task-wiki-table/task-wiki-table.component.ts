import { Component, OnInit, Input } from "@angular/core";
import { Task, mockupTask, taskTableConfig } from "src/model/task";

@Component({
  selector: "app-task-wiki-table",
  templateUrl: "./task-wiki-table.component.html",
  styleUrls: ["./task-wiki-table.component.scss"],
})
export class TaskWikiTableComponent implements OnInit {
  constructor() {}

  @Input() taskList: Task[];
  @Input() taskTableConfig = taskTableConfig;

  ngOnInit(): void {
    if (!this.taskList) {
      this.taskList = mockupTask;
    }
  }
}
