import { Component, OnInit } from "@angular/core";
import { ToolbarConfig } from "src/types/_index";

@Component({
  selector: "app-wiki-page",
  templateUrl: "./wiki-page.component.html",
  styleUrls: ["./wiki-page.component.scss"],
})
export class WikiPageComponent implements OnInit {
  toolbarConfig: ToolbarConfig[]; //TODO write a service

  constructor() {
    this.toolbarConfig = [
      {
        name: "wiki-add",
        type: "button",
        label: "Add",
        icon: "fas fas-plus",
        display: true,
        onClick: () => {
          return this.onAddClick();
        },
      },
      {
        name: "wiki-delete",
        type: "button",
        label: "Delete",
        icon: "fas fas-delete",
        display: true,
        onClick: () => {
          return this.onDeleteClick();
        },
      },
      {
        name: "wiki-add",
        type: "button",
        label: "Add",
        icon: "fas fas-plus",
        display: true,
        onClick: () => {
          return this.onAddClick();
        },
      },
    ];
  }

  ngOnInit(): void {}

  onAddClick = () => {
    alert("add click");
  };

  onDeleteClick = () => {
    alert("delete click");
  };
}
