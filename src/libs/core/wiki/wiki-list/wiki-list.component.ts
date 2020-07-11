import { Component, OnInit } from "@angular/core";
import { WikiStore } from "src/services/wiki.store";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-wiki-list",
  templateUrl: "./wiki-list.component.html",
  styleUrls: ["./wiki-list.component.scss"],
})
export class WikiListComponent implements OnInit {
  wikiList = [
    {
      name: "food",
      desc: "Food in the world for ants to collect and consume",
    },
    {
      name: "task",
      desc: "Task performed by ants to keep their life going",
    },
  ];

  constructor(
    private wikiStore: WikiStore,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  clickItem(item: any) {
    this.wikiStore.setSelectedTableName(item.name);
    this.router.navigate(["/", "wiki", item.name], { relativeTo: this.route });
  }
}
