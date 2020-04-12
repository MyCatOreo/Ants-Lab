import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { ButtonModule } from "../button/button.module";

// Widget module. exports toolbar

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, ButtonModule],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
