import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FoodWikiTableComponent } from "./food-wiki-table/food-wiki-table.component";
import { FoodWikiItemComponent } from "./food-wiki-item/food-wiki-item.component";
import { RouterModule } from "@angular/router";
import { TableModule } from "src/libs/_index";

@NgModule({
  declarations: [FoodWikiTableComponent, FoodWikiItemComponent],
  imports: [
    CommonModule,
    TableModule,
    RouterModule.forChild([
      { path: "", outlet: "wiki-table", component: FoodWikiTableComponent },
      { path: "", component: FoodWikiItemComponent },
    ]),
  ],
})
export class FoodWikiModule {}
