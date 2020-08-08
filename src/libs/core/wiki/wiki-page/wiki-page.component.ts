import { Component, OnInit } from "@angular/core";
import { ToolbarConfig } from "src/types/_index";
import { WikiService } from "src/services/wiki.service";
import { WikiStore } from "src/services/wiki.store";

@Component({
  selector: "app-wiki-page",
  templateUrl: "./wiki-page.component.html",
  styleUrls: ["./wiki-page.component.scss"],
})
export class WikiPageComponent implements OnInit {
  toolbarConfig: ToolbarConfig[]; //TODO write a service

  constructor(private wikiStore: WikiStore, private wikiService: WikiService) {
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
        name: "wiki-search",
        type: "search",
        label: "Search",
        icon: "fas fa-search",
        rightAlign: true,
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
    let selectedTable;
    let selectedItem;
    this.wikiStore
      .subscribeSelectedTable()
      .subscribe((res) => (selectedTable = res));
    this.wikiStore
      .subscribeSelectedItemId()
      .subscribe((res) => (selectedItem = res));
    this.wikiService
      .deleteWikiItem(selectedItem, selectedTable)
      .subscribe(() => this.wikiStore.getLatestWikiTable(selectedTable));
  };
}
