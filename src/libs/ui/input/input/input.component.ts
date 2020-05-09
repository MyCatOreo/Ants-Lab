import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

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

  showHelp: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  @Input("value") _value = undefined; //NOTE: @Input('someInput') takes an input value named 'someInput' and map it to _someInput property.
  onChange: any = () => {};
  onTouched: any = () => {};

  //NOTE: getter and setter:
  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  //=================
  //Implementing ControlValueAccessor interface
  //NOTE Implementing Control Value Accessor: https://coryrylan.com/blog/angular-custom-form-controls-with-reactive-forms-and-ngmodel

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }

  //passes in a callback function as a parameter for us to call whenever the value has changed.
  registerOnChange(fn: any) {
    this.onChange = fn; //Set the property onChange to the callback, it will be called whenever our setter on the value property is called.
  }

  //The registerOnTouched method passes back a callback to call whenever the user has touched the custom control.
  //When we call this callback, it notifies Angular to apply the appropriate CSS classes and validation logic to our custom control.
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState() {}

  //End of Implementing ControlValueAccessor interface
  //================

  clickHelp() {
    this.showHelp = !this.showHelp;
  }
}
