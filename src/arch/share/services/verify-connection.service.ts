import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { map } from "rxjs/operators";

@Injectable()
export class CheckConnectionService {

  public cnx: BehaviorSubject<string> = new BehaviorSubject("");

  checkConnection(): Observable<any> {
    let initialEvent$ = of(navigator.onLine);
    let online$ = Observable.fromEvent(window, "online").pipe(map(() => false));
    let offline$ = Observable.fromEvent(window, "offline").pipe(map(() => false));

    return Observable.merge(initialEvent$, online$, offline$);
  }

  setValueBehavious(val: string) {
    this.cnx.next(val);
  }

  getBehavious(): Observable<string> {
    return this.cnx.asObservable();
  }
}
