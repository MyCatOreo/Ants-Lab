import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ModulePageComponent } from "./components/module-page/module-page.component";
import { NavbarModule, MenuModule } from "src/libs/_index";

@NgModule({
  declarations: [AppComponent, ModulePageComponent],
  imports: [BrowserModule, AppRoutingModule, NavbarModule, MenuModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
