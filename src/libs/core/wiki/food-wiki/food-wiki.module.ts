import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FoodWikiTableComponent } from "./food-wiki-table/food-wiki-table.component";
import { FoodWikiItemComponent } from "./food-wiki-item/food-wiki-item.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [FoodWikiTableComponent, FoodWikiItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", outlet: "wiki-table", component: FoodWikiTableComponent },
      { path: "", component: FoodWikiItemComponent }
    ])
  ]
})
export class FoodWikiModule {}
