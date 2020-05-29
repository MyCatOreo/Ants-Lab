import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarModule, MenuModule, WikiModule } from "src/libs/_index";
import { HttpClientModule } from "@angular/common/http";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";

//TODO: move this somewhere
var firebaseConfig = {
  apiKey: "AIzaSyA531VwEmTvZ6AnVg1NEDev1scFX22oWSU",
  authDomain: "ants-lab.firebaseapp.com",
  databaseURL: "https://ants-lab.firebaseio.com",
  projectId: "ants-lab",
  storageBucket: "ants-lab.appspot.com",
  messagingSenderId: "1037257754889",
  appId: "1:1037257754889:web:660bfdd5cc9ad7eec6ebd8",
  measurementId: "G-W586SER2JG",
};

//Domain module: top level module for the app
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    NavbarModule,
    MenuModule,
    WikiModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
