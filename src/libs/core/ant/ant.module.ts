import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AntPageComponent } from "./ant-page/ant-page.component";
import { AntSearchComponent } from "./ant-search/ant-search.component";
import { AntTableComponent } from "./ant-table/ant-table.component";
import { AntItemComponent } from "./ant-item/ant-item.component";

//Routed module. Route: /ant
@NgModule({
  declarations: [
    AntPageComponent,
    AntSearchComponent,
    AntTableComponent,
    AntItemComponent,
  ],
  imports: [CommonModule],
})
export class AntModule {}
