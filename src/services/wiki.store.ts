import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError, of } from "rxjs";
import { catchError, map, tap, concatMap, finalize } from "rxjs/operators";
import { Wiki, initWiki } from "src/model/_index";
import { AngularFirestore } from "@angular/fire/firestore";

// The store manager for wiki data

// We need to do these things:
// 1. A local store wikiSubject and its oversable wiki$
// 2. Something that subsribe to a table on the server.
//    This thing provide data streaming so that local copy and server is always synchronized
//    This is the only time data can update to the local store
// 3. Something that unsubsribe to that table.
//    You don't want to keep receiving update when you're not in wiki.
// 4. Something that reads the data from local store: the list, the item, selected table, selected item
// 5. Local setters that sets local only values such as selected id

@Injectable({ providedIn: "root" }) //NOTE: come back
export class WikiStore {
  // 1. the store

  private wikiSubject = new BehaviorSubject<Wiki>(initWiki);
  wiki$: Observable<Wiki> = this.wikiSubject.asObservable();

  constructor(private db: AngularFirestore) {
    //  this._streamInitWikiTable();
  }

  // 2. Subscribe motheds

  _streamInitWikiTable() {
    this.streamWikiTable("food"); //TODO: get this from some list
  }

  /**
   * stream data for wiki table from server
   * @param table
   */
  streamWikiTable(table: string) {
    console.log(`stream wiki table - ${table}`);
    const streamWikiTable$ = this.db
      .collection(table)
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          console.log(`streamWikiTable response`, snaps);
          return snaps.map((snap: any) => {
            return { id: snap.payload.doc.id, ...snap.payload.doc.data() };
          });
        }),
        catchError((err) => {
          const message = "Could not stream wiki table";
          console.log(message, err);
          return throwError(err); //NOTE
        }),
        tap((streamWikiTable) => {
          this.wikiSubject.next({
            ...this.wikiSubject.getValue(),
            [table]: { items: streamWikiTable },
          });
        }) //NOTE: tap - Perform a side effect for every emission on the source Observable, but return an Observable that is identical to the source.
      );

    streamWikiTable$.subscribe();
  }

  // 3. Unsubscribe methods

  // 4. Getters

  subscribeWikiItem(table: string, id: string): Observable<any> {
    return this.wiki$.pipe(
      map((data: Wiki) => data[table].items.find((item) => item.id === id))
    );
  }

  subscribeTable(table: string): Observable<any[]> {
    return this.wiki$.pipe(map((wiki: Wiki) => wiki[table].items));
  }

  subscribeSelectedItemId(): Observable<string> {
    return this.wiki$.pipe(map((data: Wiki) => data.selectedItemId));
  }

  subscribeSelectedTable(): Observable<string> {
    return this.wiki$.pipe(map((data: Wiki) => data.selectedTable));
  }

  subscribeSelectedItem(): Observable<any> {
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

  // 5. Setters
  setSelectedTableName(tableName: string) {
    console.log("set selected table :", tableName);
    this.wikiSubject.next({
      ...this.wikiSubject.getValue(),
      selectedTable: tableName,
    });
    if (this.wikiSubject.getValue()[tableName].items === undefined) {
      this.streamWikiTable(tableName);
    }
  }

  setSelectedItemId(id: string) {
    console.log("set selected item :", id);
    this.wikiSubject.next({
      ...this.wikiSubject.getValue(),
      selectedItemId: id,
    });
  }

  // showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
  //   return of(null).pipe(
  //     tap(() => console.log("loading")),
  //     concatMap(() => obs$),
  //     finalize(() => console.log("loading finish"))
  //   );
  // }
}
