import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WikiPageComponent } from "src/libs/core/wiki/wiki-page/wiki-page.component";

const routes: Routes = [
  {
    path: "wiki",
    component: WikiPageComponent,
    children: [
      {
        path: "food", // I must import 1 module. So combine item and table
        loadChildren: () => {
          return import("src/libs/core/wiki/food-wiki/food-wiki.module").then(
            m => m.FoodWikiModule
          );
        }
      },
      {
        path: "task",
        loadChildren: () =>
          import("src/libs/core/wiki/task-wiki/task-wiki.module").then(
            m => m.TaskWikiModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WikiRoutingModule {}
