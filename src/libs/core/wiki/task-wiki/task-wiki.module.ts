import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskWikiTableComponent } from "./task-wiki-table/task-wiki-table.component";
import { TaskWikiItemComponent } from "./task-wiki-item/task-wiki-item.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [TaskWikiTableComponent, TaskWikiItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", outlet: "wiki-table", component: TaskWikiTableComponent },
      { path: "", component: TaskWikiItemComponent }
    ])
  ]
})
export class TaskWikiModule {}
