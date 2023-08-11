import { Observable } from "rxjs";
import { UseCase } from "../../base/usecase/usecase.model";
import { HeroesRepositorie } from "../../repositorie/heroes/hero.repositorie";
import { Injectable } from "@angular/core";

@Injectable()
export class DeleteHeroesUseCase implements UseCase<number, any> {
  constructor(private heroes: HeroesRepositorie) {}

  execute(param: number): Observable<any> {
    return this.heroes.deleteHeroes(param);
  }
}
