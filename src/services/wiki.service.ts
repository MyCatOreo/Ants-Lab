import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WikiStore } from "./wiki.store";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class WikiService {
  constructor(private httpClient: HttpClient, private wikiStore: WikiStore) {}

  postWikiItem(id: number, table: string, data: any) {
    this.httpClient.post(`url/${table}/${id}`, data).pipe(
      catchError((err) => {
        const message = "Could not load wiki table";
        console.log(message, err);
        return throwError(err); //NOTE
      }),
      tap(() => {
        this.wikiStore.getLatestWikiTable(table);
      })
    );
  }
}
