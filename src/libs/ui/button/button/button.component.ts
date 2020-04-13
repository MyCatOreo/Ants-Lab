import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() label: string = "";
  @Input() icon: string = "";
  @Output() onButtonClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  clickButton() {
    //TODO: may need to define this somewhere
    const data = {
      id: this.id,
      name: this.name,
    };
    this.onButtonClick.emit(data);
  }
}
