import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule } from "ionic-angular";
import { MyApp } from "./app.component";
import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";
import { HttpClientModule } from "@angular/common/http";
import { PROVIDERS } from "../arch/core/core.providers";
import { FilterListPipe } from "../arch/share/pipe/filter.pipe";
import { IonicStorageModule } from "@ionic/storage";

@NgModule({
  declarations: [MyApp, AboutPage, ContactPage, HomePage, TabsPage, FilterListPipe],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(MyApp), IonicStorageModule.forRoot()],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, AboutPage, ContactPage, HomePage, TabsPage],
  providers: PROVIDERS
})
export class AppModule {}
