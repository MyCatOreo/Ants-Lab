import { Component, OnInit, Input } from "@angular/core";
import { foodWikiConfig, Food } from "src/model/food";
import { WikiStore } from "src/services/wiki.store";
import { Observable } from "rxjs";

@Component({
  selector: "app-food-wiki-table",
  templateUrl: "./food-wiki-table.component.html",
  styleUrls: ["./food-wiki-table.component.scss"],
})
export class FoodWikiTableComponent implements OnInit {
  constructor(private wikiStore: WikiStore) {}

  foodList$: Observable<Food[]>;
  @Input() foodWikiConfig = foodWikiConfig;

  ngOnInit(): void {
    this.foodList$ = this.wikiStore.subscribeTable("food");
  }

  onFoodSelected(selectedId: string) {
    this.wikiStore.setSelectedItemId(selectedId);
  }
}
