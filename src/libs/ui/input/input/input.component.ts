import { Component, forwardRef, Input, OnInit } from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from "@angular/forms";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, //NOTE: Implementing Control Value Accessor: https://medium.com/@majdasab/implementing-control-value-accessor-in-angular-1b89f2f84ebf
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit {
  @Input() name: string;
  @Input() type: "text" | "number";
  @Input() label: string;
  @Input() errors: ValidationErrors[];

  showHelp: boolean = false;
  highlightLabel: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  //=================
  //Implementing ControlValueAccessor interface
  //NOTE Implementing Control Value Accessor: https://www.youtube.com/watch?v=EY0Nw06xyt8

  // set value from form controller's value to this component's value
  value: any;
  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }

  //store function passed in for (input) event. Trigger Form API to execute tasks for value change behavior
  onChange: (e) => {};
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  //store function passed in for (blur) event. Trigger Form API to execute tasks for value touched behavior
  onTouched: (e) => {};
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  disabled: boolean;
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  //End of Implementing ControlValueAccessor interface
  //================

  toggleHelp(isVisible: boolean) {
    //TODO: pause 500ms before set to visible
    this.showHelp = isVisible;
  }

  toggleFocus(isFocused: boolean) {
    this.highlightLabel = isFocused;
  }
}
