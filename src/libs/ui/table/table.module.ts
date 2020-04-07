import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./table/table.component";

//Widget module. Export table widgets
@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule],
  exports: [TableComponent],
})
export class TableModule {}
