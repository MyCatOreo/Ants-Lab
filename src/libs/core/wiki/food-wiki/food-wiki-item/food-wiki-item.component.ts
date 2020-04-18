import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { foodWikiConfig } from "src/model/food";
import { ToolbarConfig } from "src/types/_index";

@Component({
  selector: "app-food-wiki-item",
  templateUrl: "./food-wiki-item.component.html",
  styleUrls: ["./food-wiki-item.component.scss"],
})
export class FoodWikiItemComponent implements OnInit {
  @Input() foodWikiConfig = foodWikiConfig;
  @Input() selectedFoodId: number;
  toolbarConfig: ToolbarConfig[]; //TODO write a service

  foodWikiForm = new FormGroup({
    name: new FormControl(""),
    stimulusC: new FormControl(""),
  });

  constructor() {}

  ngOnInit(): void {}
  updateValue(e) {
    //  this.name.setValue(e.target.value);
  }
}
