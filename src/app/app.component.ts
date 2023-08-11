import { Component } from "@angular/core";
import { Platform, ToastController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { TabsPage } from "../pages/tabs/tabs";
import { DatabaseService } from "../arch/share/services/sqlite/sqlite-database.service";
import { CheckConnectionService } from "../arch/share/services/verify-connection.service";
import { SQLiteObject } from "@ionic-native/sqlite";

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private dbProvider: DatabaseService,
    private check: CheckConnectionService,
    public toastCtrl: ToastController
  ) {
    platform.ready().then(() => {
      // PARA ESTE DESAFIO UTILIZEI UM SERVICE A NÍVEL DE WEBVIEW
      // PARA USO NO DISPOSITIVO REAL PODERÁ SER UTILIZADO UMA BIBLIOTECA COMO A: NETWORK
      this.check.checkConnection().subscribe((e) => {
        this.check.setValueBehavious(e.type);
      });

      this.check.getBehavious().subscribe(e => {

        //If online check data in SQLite
        if(e === 'online') {
          this.dbProvider.getDB().then((db: SQLiteObject) => {
            let sql = 'select * from cadHeroes';

            db.executeSql(sql).then(r => {
              if(r.rows.length > 0){
                const toast = this.toastCtrl.create({
                  message: 'Internet conectada! Enviando dados.',
                  duration: 3000
                })
                toast.present()
              }
            })
          })          
        }
      })

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Instância principal do SQLite
      dbProvider
        .createDatabase()
        .then((e) => {
          console.log("sucesso", e);
          // fechando a SplashScreen somente quando o banco for criado
          this.openHomePage(splashScreen);
        })
        .catch((e) => {
          console.log("erro", e);
          // ou se houver erro na criação do banco
          this.openHomePage(splashScreen);
        });
    });
  }

  private openHomePage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.rootPage = TabsPage;
  }
}
