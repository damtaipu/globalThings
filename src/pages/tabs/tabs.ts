import { Component, ViewChild } from '@angular/core';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Tabs } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('controlTabs') tabRef: Tabs;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {}

  goToRegisterHeroes(){
    this.tabRef.select(1);
  }
}
