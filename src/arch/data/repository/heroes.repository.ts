import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { getHeader } from "../../core/base/header/header.base";
import { Injectable } from "@angular/core";
import { HeroesRepositorie } from "../../core/repositorie/heroes/hero.repositorie";
import {
  IGetCategory,
  ISPostHeroes,
  IRPostHeroes,
  IUpdateHeroes,
  IGetHeroes,
} from "../../core/model/heroes/heroes.model";
import { of } from "rxjs/observable/of";

@Injectable()
export class HeroesApiRepository extends HeroesRepositorie {
  constructor(private http: HttpClient) {
    super();
  }

  getCategoryHeroes(): Observable<IGetCategory> {
    return of();
  }

  postHeroes(param: ISPostHeroes): Observable<IRPostHeroes> {
    const httpOptions = {
      headers: getHeader(),
    };

    return this.http.post<IRPostHeroes>(
      "https://candidato01.globalthings.net/api/Heroes",
      param,
      httpOptions
    );
  }

  deleteHeroes(param: number): Observable<any> {
    const httpOptions = {
      headers: getHeader(),
    };

    return this.http.delete<any>(
      `https://candidato01.globalthings.net/api/Heroes/${param}`,
      httpOptions
    );
  }
  updateHeroes(param: IUpdateHeroes): Observable<any> {
    return of();
  }

  getHeroes(): Observable<IGetHeroes> {
    const httpOptions = {
      headers: getHeader(),
    };

    return this.http.get<IGetHeroes>(
      "https://candidato01.globalthings.net/api/Heroes",
      httpOptions
    );
  }
}
