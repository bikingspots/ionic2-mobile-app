import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {RideList} from '../pages/ridelist/ridelist';
import {RideMap} from '../pages/ridemap/ridemap';

@Component({
  templateUrl: './app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public rootPage: any = RideList
  public pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,public menu: MenuController) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Ride list', component: RideList },
      { title: 'Ride map', component: RideMap }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
