import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BmiPage } from '../pages/bmi/bmi';
import { DbwPage } from '../pages/dbw/dbw';
import { EnergyRequirementPage } from '../pages/energy-requirement/energy-requirement';
import { WaistCircumferencePage } from '../pages/waist-circumference/waist-circumference';
import { WaistHipPage } from '../pages/waist-hip/waist-hip';
import { WaistHeightPage } from '../pages/waist-height/waist-height';

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
    WaistHeightPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BmiPage,
    DbwPage,
    EnergyRequirementPage,
    WaistCircumferencePage,
    WaistHipPage,
    WaistHeightPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
