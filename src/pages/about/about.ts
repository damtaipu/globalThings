import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AlertLoadingService } from "../../arch/share/services/alert-loading.service";
import { PostHeroesUseCase } from "../../arch/core/usecase/heroes/post-heroes.usecase";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TabsPage } from "../tabs/tabs";
import { CheckConnectionService } from "../../arch/share/services/verify-connection.service";
import { SaveDataHeroeService } from "../../arch/share/services/sqlite/sqlite-savedataheroe.service";

@Component({
  selector: "page-about",
  templateUrl: "about.html",
})
export class AboutPage {
  nameHeroe: string;
  categoryHeroe: string;
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  notifyConec: string;

  constructor(
    public navCtrl: NavController,
    private loadAlert: AlertLoadingService,
    private postHeroes: PostHeroesUseCase,
    private check: CheckConnectionService,
    private saveInMemory: SaveDataHeroeService
  ) {}

  ionViewDidEnter() {
    // Return data connection
    this.check.getBehavious().subscribe((r) => {
      this.notifyConec = r;
    });
  }

  submitHeroi() {
    if (
      typeof this.nameHeroe === "undefined" ||
      typeof this.nameHeroe === "undefined"
    ) {
      this.loadAlert.presentAlert(
        "Erro no formulário!",
        "Informe todos os campos do formulário."
      );
      return;
    }

    const objHeroe = {
      Name: this.nameHeroe,
      Active: true,
      CategoryId: Number(this.categoryHeroe),
    };

    this.loadAlert.presentLoading("Cadastrando seu Herói...");

    if (this.notifyConec === "offline") {
      this.loadAlert.dismissLoading();

      this.loadAlert
        .presentAlert(
          "Offline!",
          "Guardamos seu Herói, mas apenas quando tiver conexão iremos salvar."
        )
        .then(() => {
          //Salvar no SQLite
          this.saveInMemory.insert(objHeroe);
        });
      return;
    }

    this.postHeroes
      .execute(objHeroe)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((r) => {
        this.loadAlert.dismissLoading();
        this.loadAlert
          .presentAlert(
            "Cadastro de herói",
            "Seu herói foi cadastrado com sucesso!"
          )
          .then((e) => {
            if (e === "ok") {
              this.navCtrl.setRoot(
                TabsPage,
                {},
                { animate: true, direction: "forward" }
              );
            }
          });
      });
  }

  ionViewWillUnload() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  backToTabMain() {
    this.navCtrl.setRoot(TabsPage, {}, { animate: true, direction: "forward" });
  }
}
