import { Observable } from "rxjs";
import { IGetCategory } from "../../model/heroes/heroes.model";
import { UseCase } from "../../base/usecase/usecase.model";
import { HeroesRepositorie } from "../../repositorie/heroes/hero.repositorie";
import { Injectable } from "@angular/core";

@Injectable()
export class GetCategoryHeroesUseCase implements UseCase<string, IGetCategory> {
  constructor(private heroes: HeroesRepositorie) {}

  execute(): Observable<IGetCategory> {
    return this.heroes.getCategoryHeroes();
  }
}
