import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { ButtonModule } from "src/libs/_index";

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule.forChild([
      {
        path: "home",
        component: HomePageComponent,
      },
    ]),
  ],
  bootstrap: [HomePageComponent],
})
export class HomeModule {}
