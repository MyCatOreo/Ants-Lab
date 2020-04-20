import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FoodWikiTableComponent } from "./food-wiki-table/food-wiki-table.component";
import { FoodWikiItemComponent } from "./food-wiki-item/food-wiki-item.component";
import { TableModule } from "src/libs/_index";
import { ButtonModule } from "src/libs/ui/button/button.module";

//Routed module. Route: /wiki/food
@NgModule({
  declarations: [FoodWikiTableComponent, FoodWikiItemComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TableModule,
    ButtonModule,
    RouterModule.forChild([
      { path: "", outlet: "wiki-table", component: FoodWikiTableComponent },
      { path: "", component: FoodWikiItemComponent },
    ]),
  ],
})
export class FoodWikiModule {}
