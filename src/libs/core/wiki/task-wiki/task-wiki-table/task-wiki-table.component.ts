import { Component, OnInit, Input } from "@angular/core";
import { Task, taskWikiConfig } from "src/model/task";
import { Observable } from "rxjs";
import { WikiStore } from "src/services/wiki.store";

@Component({
  selector: "app-task-wiki-table",
  templateUrl: "./task-wiki-table.component.html",
  styleUrls: ["./task-wiki-table.component.scss"],
})
export class TaskWikiTableComponent implements OnInit {
  constructor(private wikiStore: WikiStore) {}

  @Input() taskList$: Observable<Task[]>;
  @Input() taskWikiConfig = taskWikiConfig;

  ngOnInit(): void {
    if (!this.taskList$) {
      this.taskList$ = this.wikiStore.getItemList("task");
    }
  }
}
