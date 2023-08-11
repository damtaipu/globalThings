import { ErrorHandler } from "@angular/core";
import { GetHeroesUseCase } from "./usecase/heroes/get-heroes.usecase";
import { IonicErrorHandler } from "ionic-angular";
import { HeroesRepositorie } from "./repositorie/heroes/hero.repositorie";
import { HeroesApiRepository } from "../data/repository/heroes.repository";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AlertLoadingService } from "../share/services/alert-loading.service";
import { PostHeroesUseCase } from "./usecase/heroes/post-heroes.usecase";
import { CheckConnectionService } from "../share/services/verify-connection.service";
import { DeleteHeroesUseCase } from "./usecase/heroes/delete-heroes.usecase";
import { SQLite } from "@ionic-native/sqlite";
import { DatabaseService } from "../share/services/sqlite/sqlite-database.service";
import { SaveDataHeroeService } from "../share/services/sqlite/sqlite-savedataheroe.service";

export const PROVIDERS = [
  StatusBar,
  SplashScreen,
  { provide: ErrorHandler, useClass: IonicErrorHandler },
  GetHeroesUseCase,
  PostHeroesUseCase,
  AlertLoadingService,
  CheckConnectionService,
  DeleteHeroesUseCase,
  {
    provide: HeroesRepositorie,
    useClass: HeroesApiRepository,
  },
  SQLite,
  DatabaseService,
  SaveDataHeroeService
];
