import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WikiPageComponent } from "./wiki-page/wiki-page.component";
import { WikiTableComponent } from "./wiki-table/wiki-table.component";
import { WikiItemComponent } from "./wiki-item/wiki-item.component";

@NgModule({
  declarations: [WikiPageComponent, WikiTableComponent, WikiItemComponent],
  imports: [CommonModule],
  exports: [WikiPageComponent]
})
export class WikiModule {}
