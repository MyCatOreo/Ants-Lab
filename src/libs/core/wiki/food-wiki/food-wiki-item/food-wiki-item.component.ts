import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
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

  // foodWikiForm = new FormGroup({
  //   name: new FormControl(),
  //   stimulusC: new FormControl(),
  // });
  foodWikiForm = this.formBuilder.group({
    name: ["", Validators.required],
    stimulusC: [0, Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //  this.foodWikiForm.setValue({ name: "hello world", stimulusC: 2 });
    this.foodWikiForm.patchValue({ name: "goodbye world" });
  }
  updateValue(e) {
    //  this.name.setValue(e.target.value);
  }

  onSubmit() {
    alert("form submit!");
  }
}
