import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-wiki-list",
  templateUrl: "./wiki-list.component.html",
  styleUrls: ["./wiki-list.component.scss"]
})
export class WikiListComponent implements OnInit {
  wikiList = [
    {
      name: "Food",
      route: "food",
      desc: "Food in the world for ants to collect and consume"
    },
    {
      name: "Task",
      route: "task",
      desc: "Task performed by ants to keep their life going"
    }
  ];

  ngOnInit(): void {}
}
