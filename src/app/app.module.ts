import { NgModule, ErrorHandler } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BmiPage } from '../pages/bmi/bmi';
import { DbwPage } from '../pages/dbw/dbw';
import { EnergyRequirementPage } from '../pages/energy-requirement/energy-requirement';
import { WaistCircumferencePage } from '../pages/waist-circumference/waist-circumference';
import { WaistHipPage } from '../pages/waist-hip/waist-hip';
import { WaistHeightPage } from '../pages/waist-height/waist-height';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { ResultsPage } from '../pages/results/results';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    BmiPage,
    DbwPage,
    EnergyRequirementPage,
    WaistCircumferencePage,
    WaistHipPage,
    WaistHeightPage,
    UserProfilePage,
    ResultsPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BmiPage,
    DbwPage,
    EnergyRequirementPage,
    WaistCircumferencePage,
    WaistHipPage,
    WaistHeightPage,
    UserProfilePage,
    ResultsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
