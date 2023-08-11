import { Injectable } from "@angular/core";
import {
  Alert,
  AlertController,
  Loading,
  LoadingController,
} from "ionic-angular";

@Injectable()
export class AlertLoadingService {
  private loading: Loading;
  private alert: Alert;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  presentLoading(action: string) {
    this.loading = this.loadingCtrl.create({
      content: action,
      dismissOnPageChange: true,
    });

    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }

  presentAlert(
    title: string,
    message: string,
    noButtom = { noButtom: false, text: "" }
  ): Promise<any> {
    const handlerNoButtom = (resolve, text) => {
      if (noButtom) {
        return {
          text: text,
          handler: () => {
            resolve(text);
          },
        };
      }
    };

    return new Promise((resolve) => {
      this.alert = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: [
          handlerNoButtom(resolve, noButtom.text),
          {
            text: "Ok",
            handler: () => {
              resolve("ok");
            },
          },
        ],
      });

      this.alert.present();
    });
  }

  dismissAlert(): Alert {
    return this.alert;
  }
}
