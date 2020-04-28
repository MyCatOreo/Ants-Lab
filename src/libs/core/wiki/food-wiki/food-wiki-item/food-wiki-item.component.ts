import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { mockupFoodItem1, mockupFoodItem2 } from "src/model/food";
import {
  FormGeneratorService,
  FormConfig,
} from "src/services/form-generator.service";

@Component({
  selector: "app-food-wiki-item",
  templateUrl: "./food-wiki-item.component.html",
  styleUrls: ["./food-wiki-item.component.scss"],
})
export class FoodWikiItemComponent implements OnInit {
  selectedFoodId: number = 1;

  foodWikiForm = this.formBuilder.group({
    name: ["", Validators.required],
    stimulusC: [0, Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //get the data
    let foodEdit;
    if (this.selectedFoodId === 1) {
      foodEdit = mockupFoodItem1;
    }
    if (this.selectedFoodId === 2) {
      foodEdit = mockupFoodItem2;
    }

    if (this.foodWikiForm) {
      this.foodWikiForm.patchValue(foodEdit);
    }
  }

  updateValue(e) {
    //  this.name.setValue(e.target.value);
  }

  onSubmit() {
    alert("form submit!");
  }
}
