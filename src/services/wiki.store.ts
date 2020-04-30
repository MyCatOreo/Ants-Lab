import { Injectable } from "@angular/core";
import { WikiModule } from "src/libs/_index";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, shareReplay, tap, find } from "rxjs/operators";
import { Wiki, initWiki } from "src/model/_index";
import { HttpClient } from "@angular/common/http";

// The store manager for wiki data

@Injectable({ providedIn: WikiModule }) //NOTE: come back
export class WikiStore {
  private wikiSubject = new BehaviorSubject<Wiki>(initWiki);
  //   class BehaviorSubject<T> extends Subject<T> {
  //     private _value;
  //     constructor(_value: T);
  //     readonly value: T;
  //     getValue(): T;
  //     next(value: T): void;
  // }

  //   class Subject<T> extends Observable<T> implements SubscriptionLike {
  //     observers: Observer<T>[];
  //     closed: boolean;
  //     isStopped: boolean;
  //     hasError: boolean;
  //     thrownError: any;
  //     constructor();
  //     lift<R>(operator: Operator<T, R>): Observable<R>;
  //     next(value?: T): void;
  //     error(err: any): void;
  //     complete(): void;
  //     unsubscribe(): void;
  //     /**
  //      * Creates a new Observable with this Subject as the source. You can do this
  //      * to create customize Observer-side logic of the Subject and conceal it from
  //      * code that uses the Observable.
  //      * @return {Observable} Observable that the Subject casts to
  //      */
  //     asObservable(): Observable<T>;
  // }
  wiki$: Observable<Wiki> = this.wikiSubject.asObservable();

  constructor(private http: HttpClient) {
    this._loadInitWikiTable();
  }

  _loadInitWikiTable() {
    this.loadWikiTable(initWiki[0].name);
  }

  loadWikiTable(table: string) {
    const loadWikiTable$ = this.http
      .get<Partial<Wiki>>(`localhost:3000/wiki/${table}`)
      .pipe(
        map((response) => response["payload"]),
        catchError((err) => {
          const message = "Could not load wiki table";
          console.log(message, err);
          return throwError(err); //NOTE
        }),
        tap((loadWikiTable) => {
          this.wikiSubject.next({
            ...this.wikiSubject.getValue(),
            [table]: loadWikiTable,
          });
        }) //NOTE: tap - Perform a side effect for every emission on the source Observable, but return an Observable that is identical to the source.
      );

    // this.loading.showLoaderUntilCompleted(loadWikiTable$).subscribe();
  }

  loadWikiItem(table: string, id: number): Observable<any> {
    return this.wiki$.pipe(
      map((data: Wiki) => data[table].items),
      find((item) => item.id === id)
    );
  }

  getSelectedTable(): Observable<string> {
    return this.wiki$.pipe(map((data: Wiki) => data.selectedTable));
  }

  setSelectedTable(table: string) {}

  getSelectedItem(): Observable<number> {
    return this.wiki$.pipe(map((data: Wiki) => data.selectedItem));
  }

  setSelectedItem(id: number) {}
}
