import { NgModule } from "@angular/core";
import { Routes, RouterModule, ExtraOptions } from "@angular/router";

const routes: Routes = [
  { path: "world", redirectTo: "wiki" },
  { path: "ant", redirectTo: "wiki" },
  { path: "algorithm", redirectTo: "wiki" },
  { path: "user", redirectTo: "wiki" },
  { path: "", pathMatch: "full", redirectTo: "wiki" },
];

const options: ExtraOptions = {
  enableTracing: true,
  //useHash: false,
  //initialNavigation?: InitialNavigation
  //errorHandler?: ErrorHandler
  //preloadingStrategy?: any
  // onSameUrlNavigation: "reload",
  // scrollPositionRestoration: "enabled",
  // anchorScrolling: "enabled"
  //scrollOffset?: [number, number] | (() => [number, number])
  //paramsInheritanceStrategy?: 'emptyOnly' | 'always'
  //malformedUriErrorHandler?: (error: URIError, urlSerializer: UrlSerializer, url: string) => UrlTree
  //urlUpdateStrategy?: 'deferred' | 'eager'
  //relativeLinkResolution?: 'legacy' | 'corrected'
};

//Routing module
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
