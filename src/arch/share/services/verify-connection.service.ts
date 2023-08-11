import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class CheckConnectionService {
  public cnx: BehaviorSubject<string> = new BehaviorSubject("");

  checkConnection(): Observable<Event> {
    let online$: Observable<Event> = Observable.fromEvent(window, "online");
    let offline$: Observable<Event> = Observable.fromEvent(window, "offline");

    return Observable.merge(online$, offline$);
  }

  setValueBehavious(val: string) {
    this.cnx.next(val);
  }

  getBehavious(): Observable<string> {
    return this.cnx.asObservable();
  }
}
