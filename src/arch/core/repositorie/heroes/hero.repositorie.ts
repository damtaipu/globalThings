import { Observable } from "rxjs";
import {
  IGetCategory,
  IGetHeroes,
  IRPostHeroes,
  ISPostHeroes,
  IUpdateHeroes,
} from "../../model/heroes/heroes.model";

export abstract class HeroesRepositorie {
  abstract getHeroes(): Observable<IGetHeroes>;
  abstract getCategoryHeroes(): Observable<IGetCategory>;
  abstract postHeroes(param: ISPostHeroes): Observable<IRPostHeroes>;
  abstract deleteHeroes(param: number): Observable<any>;
  abstract updateHeroes(param: IUpdateHeroes): Observable<any>;
}
