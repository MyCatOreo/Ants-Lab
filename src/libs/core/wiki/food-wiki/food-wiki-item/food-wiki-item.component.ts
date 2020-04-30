import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { mockupFoodItem1, mockupFoodItem2, mockupFoods } from "src/model/food";
import { Observable } from "rxjs";

@Component({
  selector: "app-food-wiki-item",
  templateUrl: "./food-wiki-item.component.html",
  styleUrls: ["./food-wiki-item.component.scss"],
})
export class FoodWikiItemComponent implements OnInit {
  selectedFoodId$: Observable<number>;

  @Input() selectedFoodId: number = 2;

  foodWikiForm = this.formBuilder.group({
    name: ["", Validators.required],
    stimulusC: [0, Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //get the data
    let foodEdit = mockupFoods.find((item) => item.id === this.selectedFoodId);
    // if (this.selectedFoodId === 1) {
    //   foodEdit = mockupFoodItem1;
    // }
    // if (this.selectedFoodId === 2) {
    //   foodEdit = mockupFoodItem2;
    // }

    this.foodWikiForm.patchValue(foodEdit);
  }

  updateValue(e) {
    //  this.name.setValue(e.target.value);
  }

  onSubmit() {
    alert("form submit!");
  }
}
