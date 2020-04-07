import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WikiPageComponent } from "./wiki-page/wiki-page.component";
import { WikiListComponent } from "./wiki-list/wiki-list.component";
import { WikiRoutingModule } from "./wiki-routing.module";

//Routed module. Route: /wiki
@NgModule({
  declarations: [WikiPageComponent, WikiListComponent],
  imports: [CommonModule, WikiRoutingModule],
  bootstrap: [WikiPageComponent],
})
export class WikiModule {}
