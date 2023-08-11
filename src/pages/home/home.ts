import { Component, ViewChild } from "@angular/core";
import {
  Content,
  ItemSliding,
  List,
  NavController,
  Slides,
} from "ionic-angular";
import { GetHeroesUseCase } from "../../arch/core/usecase/heroes/get-heroes.usecase";
import { DeleteHeroesUseCase } from "../../arch/core/usecase/heroes/delete-heroes.usecase";
import { AlertLoadingService } from "../../arch/share/services/alert-loading.service";
import { CheckConnectionService } from "../../arch/share/services/verify-connection.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  @ViewChild("listEndDetail") listEndDetail: Slides;
  @ViewChild("slidingItem") itemSlid: ItemSliding;
  @ViewChild("content") content: Content;
  @ViewChild("listHeroes") listHeroes: List;

  title: string = "Lista de Heróis";
  backButton: boolean = false;
  searchBar: boolean = true;
  heroesList: any[] = [];
  searchTerms: any;
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  notifyConec: string;
  detailHeroi = null;

  constructor(
    public navCtrl: NavController,
    private heroes: GetHeroesUseCase,
    private delHeroes: DeleteHeroesUseCase,
    private loadAlert: AlertLoadingService,
    private check: CheckConnectionService
  ) {}

  ionViewWillEnter() {
    setTimeout(() => {
      this.listEndDetail.slideTo(0);
    });

    this.listEndDetail.lockSwipeToNext(true);
    this.getAllHeroes();

    // Return data connection
    this.check.getBehavious().subscribe((r) => {
      this.notifyConec = r;
    });
  }

  ionViewDidEnter() {}

  getAllHeroes(): void {
    this.heroes
      .execute()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (x) => {
          this.heroesList = x.Items;

          setTimeout(() => {
            this.openSliding(this.itemSlid).then((e) => {
              this.itemSlid.close();
            });
          }, 1000);

        },
        (e) => {
          console.log(e);
        }
      );
  }

  openSliding(sliding: any): Promise<any> {
    return new Promise((resolve) => {
      sliding.moveSliding(-80);
      const numWidth = Number(-80);
      const negWidth = numWidth - numWidth * 2;
      sliding._setOpenAmount(negWidth, true);

      setTimeout(() => {
        resolve(true);
      }, 1500);      
    });
  }

  seeDetail(hero): void {
    this.backButton = true;
    this.searchBar = false;
    this.title = "Detalhes do Herói";
    this.listEndDetail.lockSwipeToNext(false);
    this.content.resize();
    this.listEndDetail.slideTo(1);

    let objHeroi = {
      Name: hero.Name,
      Category: hero.Category,
    };

    this.detailHeroi = objHeroi;
  }

  seeSlideChange(): void {
    const getSlideIndex = this.listEndDetail.getActiveIndex();

    if (getSlideIndex === 0) {
      this.title = "Lista de Heróis";
      this.searchBar = true;
      this.listEndDetail.lockSwipeToNext(true);
    }
  }

  backToListHeroes(): void {
    this.listEndDetail.slideTo(0);
    this.content.resize();
    this.backButton = false;
    this.detailHeroi = null;
  }

  searchHeroes(val): void {
    this.searchTerms = val.srcElement.value;
  }

  async deleteHeroe(val, sliding: ItemSliding) {
    this.loadAlert
      .presentAlert("Apagar herói", "Deseja realmente pagar esse herói?", {
        noButtom: true,
        text: "Não",
      })
      .then((e) => {
        if (e === "ok") {
          // is Offline
          if (this.notifyConec === "offline") {
            this.loadAlert.dismissAlert().onDidDismiss((e) => {
              this.loadAlert.presentAlert(
                "OffLine",
                "No momento você está sem internet. Guardamos sua intensão e iremos aparagar quando a internet voltar."
              );
              this.loadAlert.dismissAlert().onDidDismiss((e) => {
                console.log("CHAMAR METODO PARA SALVAR NO SQLITE");
                sliding.close();
              });
            });
            return;
          }

          // is Online
          this.loadAlert.presentLoading("Apagando...");
          this.delHeroes
            .execute(val.Id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((e) => {
              this.loadAlert.dismissLoading();
              this.loadAlert.presentAlert(
                "Herói apagado!",
                "Você apagou o Herói da sua lista"
              );
              this.loadAlert.dismissAlert().onDidDismiss((e) => {
                this.getAllHeroes();
              });
            });

          return;
        }

        sliding.close();
      });
  }
}
