import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ModulePageComponent } from "./components/module-page/module-page.component";
import { WikiPageComponent } from "src/libs/core/wiki/wiki-page/wiki-page.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "wiki" },
  { path: "wiki", component: WikiPageComponent },
  { path: "wiki/:id", component: WikiPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
