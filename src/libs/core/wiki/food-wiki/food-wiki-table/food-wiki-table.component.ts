import { Component, OnInit, Input } from "@angular/core";
import { mockupFoods, foodTableConfig, Food } from "src/model/food";

@Component({
  selector: "app-food-wiki-table",
  templateUrl: "./food-wiki-table.component.html",
  styleUrls: ["./food-wiki-table.component.scss"],
})
export class FoodWikiTableComponent implements OnInit {
  constructor() {}

  @Input() foodList: Food[];
  @Input() foodTableConfig = foodTableConfig;

  ngOnInit(): void {
    if (!this.foodList) {
      this.foodList = mockupFoods;
    }
  }

  _processColumns = (tableConfig: any[]) => {};
}
