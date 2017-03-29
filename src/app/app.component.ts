import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BmiPage } from '../pages/bmi/bmi';
import { DbwPage } from '../pages/dbw/dbw';
import { EnergyRequirementPage } from '../pages/energy-requirement/energy-requirement';
import { WaistCircumferencePage } from '../pages/waist-circumference/waist-circumference';
import { WaistHipPage } from '../pages/waist-hip/waist-hip';
import { WaistHeightPage } from '../pages/waist-height/waist-height';

// import { Page2 } from '../pages/page2/page2';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = BmiPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Body Mass Index', component: BmiPage },
      { title: 'Desirable Body Weight', component: DbwPage },
      { title: 'Energy Requirement', component: EnergyRequirementPage },
      { title: 'Waist Circumference', component: WaistCircumferencePage },
      { title: 'Waist-Hip Ratio', component: WaistHipPage },
      { title: 'Waist-Height Ratio', component: WaistHeightPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
