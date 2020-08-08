import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { WikiStore } from "src/services/wiki.store";
import { tap } from "rxjs/operators";
import { WikiService } from "src/services/wiki.service";

@Component({
  selector: "app-food-wiki-item",
  templateUrl: "./food-wiki-item.component.html",
  styleUrls: ["./food-wiki-item.component.scss"],
})
export class FoodWikiItemComponent implements OnInit {
  selectedFood$: Observable<any>;

  foodWikiForm = this.formBuilder.group({
    id: [""],
    name: ["", Validators.required],
    stimulusC: [0, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private wikiStore: WikiStore,
    private wikiService: WikiService
  ) {}

  ngOnInit(): void {
    this.selectedFood$ = this.wikiStore.subscribeSelectedItem().pipe(
      tap((food) => {
        this.foodWikiForm.patchValue(food || {});
      })
    );
    this.selectedFood$.subscribe();
  }

  updateValue(controlName: string, value: any) {
    this.foodWikiForm.controls[controlName].setValue(value);
  }

  //TODO: I don't like the way I implemented error display
  getErrors(controlName: string) {
    return this.foodWikiForm.controls[controlName].errors;
  }

  onSubmit() {
    console.log("submit food form with value ", this.foodWikiForm.value);
    this.wikiService
      .postWikiItem(this.foodWikiForm.value.id, "food", this.foodWikiForm.value)
      .subscribe(
        () => {
          this.wikiStore.getLatestWikiTable("food");
        },
        (error) => {
          console.log("error submit food wiki item", error);
        }
      );
  }
}
