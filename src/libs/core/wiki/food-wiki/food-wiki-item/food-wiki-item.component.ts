import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import {
  mockupFoodItem1,
  mockupFoodItem2,
  mockupFoods,
  Food,
} from "src/model/food";
import { Observable } from "rxjs";
import { WikiStore } from "src/services/wiki.store";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-food-wiki-item",
  templateUrl: "./food-wiki-item.component.html",
  styleUrls: ["./food-wiki-item.component.scss"],
})
export class FoodWikiItemComponent implements OnInit {
  selectedFood$: Observable<any>;
  selectedFoodId$: Observable<number>;

  foodWikiForm = this.formBuilder.group({
    name: ["", Validators.required],
    stimulusC: [0, Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private wikiStore: WikiStore) {}

  ngOnInit(): void {
    this.selectedFood$ = this.wikiStore.getSelectedItem();
    // .pipe(
    //   tap((food) => {
    //     this.foodWikiForm.patchValue(food);
    //     console.log("food ", food);
    //   })
    // );
    this.selectedFoodId$ = this.wikiStore.getSelectedItemId();
  }

  updateValue(e) {
    //  this.name.setValue(e.target.value);
  }

  onSubmit() {
    alert("form submit!");
  }
}
