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
        icon: "fas fa-plus",
      },
      {
        name: "wiki-delete",
        type: "button",
        label: "Delete",
        icon: "fas fa-trash-alt",
      },
      {
        name: "wiki-add",
        type: "button",
        label: "Add",
        icon: "fas fa-plus",
      },
    ];
  }

  ngOnInit(): void {}

  handleToolbarButtonClick(e: any) {
    //TODO: turn this into action
    switch (e.name) {
      case "wiki-add":
        this.handleAddClick();
        break;
      case "wiki-delete":
        this.handleDeleteClick();
        break;
      default:
      //TODO: error
    }
  }

  handleAddClick = () => {
    alert("add click");
  };

  handleDeleteClick = () => {
    alert("delete click");
  };
}
