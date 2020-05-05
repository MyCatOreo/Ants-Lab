import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError, of } from "rxjs";
import { catchError, map, tap, concatMap, finalize } from "rxjs/operators";
import { Wiki, initWiki } from "src/model/_index";
import { HttpClient } from "@angular/common/http";

// The store manager for wiki data

@Injectable({ providedIn: "root" }) //NOTE: come back
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
    this.loadWikiTable("food"); //TODO: get this from some list
  }

  //get data for wiki table from server
  loadWikiTable(table: string) {
    console.log("load wiki food table");
    table = "food";
    const loadWikiTable$ = this.http
      .get<any>(`http://localhost:3000/wiki/food`) //TODO: comeback for hardcode
      .pipe(
        map((response) => {
          console.log("res", response);
          return response;
        }),
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

    loadWikiTable$.subscribe();
  }

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => console.log("loading")),
      concatMap(() => obs$),
      finalize(() => console.log("loading finish"))
    );
  }

  getWikiItem(table: string, id: number): Observable<any> {
    return this.wiki$.pipe(
      map((data: Wiki) => data[table].items.find((item) => item.id === id))
    );
  }

  getSelectedTable(): Observable<string> {
    return this.wiki$.pipe(map((data: Wiki) => data.selectedTable));
  }

  setSelectedTable(table: string) {
    console.log("set selected table :", table);
    this.wikiSubject.next({
      ...this.wikiSubject.getValue(),
      selectedTable: table,
    });
    if (this.wikiSubject.getValue()[table].items === undefined) {
      this.loadWikiTable(table);
    }
  }

  getSelectedItemId(): Observable<number> {
    return this.wiki$.pipe(map((data: Wiki) => data.selectedItemId));
  }

  setSelectedItemId(id: number) {
    console.log("set selected item :", id);
    this.wikiSubject.next({
      ...this.wikiSubject.getValue(),
      selectedItemId: id,
    });
  }

  getSelectedItem(): Observable<any> {
    return this.wiki$.pipe(
      map((wiki: Wiki) => {
        const table = this.wikiSubject.getValue().selectedTable;
        const itemId = this.wikiSubject.getValue().selectedItemId;

        return wiki[table].items
          ? wiki[table].items.find((item) => item.id === itemId) //NOTE: ok...well...fine. find operator and array's find function are different things..
          : [];
      })
    );
  }
}
