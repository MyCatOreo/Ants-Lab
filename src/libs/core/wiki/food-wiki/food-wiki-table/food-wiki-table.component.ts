import { Component, OnInit, Input } from "@angular/core";
import { mockupFoods, foodWikiConfig, Food } from "src/model/food";

@Component({
  selector: "app-food-wiki-table",
  templateUrl: "./food-wiki-table.component.html",
  styleUrls: ["./food-wiki-table.component.scss"],
})
export class FoodWikiTableComponent implements OnInit {
  constructor() {}

  @Input() foodList: Food[];
  @Input() foodWikiConfig = foodWikiConfig;

  ngOnInit(): void {
    if (!this.foodList) {
      this.foodList = mockupFoods;
    }
  }

  onFoodSelected(selectedId: number) {
    alert(selectedId);
  }
}
