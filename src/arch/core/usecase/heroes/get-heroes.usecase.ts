import { Observable } from "rxjs";
import { IGetHeroes } from "../../model/heroes/heroes.model";
import { UseCase } from "../../base/usecase/usecase.model";
import { HeroesRepositorie } from "../../repositorie/heroes/hero.repositorie";
import { Injectable } from "@angular/core";

@Injectable()
export class GetHeroesUseCase implements UseCase<string, IGetHeroes> {
  constructor(private heroes: HeroesRepositorie) {}

  execute(): Observable<IGetHeroes> {
    return this.heroes.getHeroes();
  }
}
