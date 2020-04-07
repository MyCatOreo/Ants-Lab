import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuComponent } from "./menu/menu.component";

//Widget module. Export menu
@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule],
  exports: [MenuComponent],
})
export class MenuModule {}
