import { Observable } from "rxjs";
import { IRPostHeroes, ISPostHeroes } from "../../model/heroes/heroes.model";
import { UseCase } from "../../base/usecase/usecase.model";
import { HeroesRepositorie } from "../../repositorie/heroes/hero.repositorie";
import { Injectable } from "@angular/core";

@Injectable()
export class PostHeroesUseCase implements UseCase<ISPostHeroes, IRPostHeroes> {
  constructor(private heroes: HeroesRepositorie) {}

  execute(param: ISPostHeroes): Observable<IRPostHeroes> {
    return this.heroes.postHeroes(param);
  }
}
