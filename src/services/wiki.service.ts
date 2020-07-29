import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WikiStore } from "./wiki.store";
import { throwError, from } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({ providedIn: "root" })
export class WikiService {
  constructor(private db: AngularFirestore, private wikiStore: WikiStore) {}

  postWikiItem(id: number, table: string, data: any) {
    return from(this.db.doc(`${table}/${id}`).update(data));
  }
}
