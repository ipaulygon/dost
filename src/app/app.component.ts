import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage) {
    this.initializeApp();
    storage.clear();
    //0-0
    storage.set('bmiM00z',11.1); storage.set('bmiM00x',16.3); 
    storage.set('bmiM00c',18.1);
    storage.set('bmiF00z',11.1); storage.set('bmiF00x',16.1); 
    storage.set('bmiF00c',17.7);
    //0-1
    storage.set('bmiM01z',12.4); storage.set('bmiM01x',17.8); 
    storage.set('bmiM01c',19.4);
    storage.set('bmiF01z',12); storage.set('bmiF01x',17.5); 
    storage.set('bmiF01c',19.1);
    //0-2
    storage.set('bmiM02z',13.7); storage.set('bmiM02x',19.4); 
    storage.set('bmiM02c',21.1);
    storage.set('bmiF02z',13); storage.set('bmiF02x',19); 
    storage.set('bmiF02c',20.7);
    //0-3
    storage.set('bmiM03z',14.3); storage.set('bmiM03x',20); 
    storage.set('bmiM03c',21.8);
    storage.set('bmiF03z',13.6); storage.set('bmiF03x',19.7); 
    storage.set('bmiF03c',21.5);
    //0-4
    storage.set('bmiM04z',14.5); storage.set('bmiM04x',20.3); 
    storage.set('bmiM04c',22.1);
    storage.set('bmiF04z',13.9); storage.set('bmiF04x',20); 
    storage.set('bmiF04c',22);
    //0-5
    storage.set('bmiM05z',14.7); storage.set('bmiM05x',20.5); 
    storage.set('bmiM05c',22.3);
    storage.set('bmiF05z',14.1); storage.set('bmiF05x',20.2); 
    storage.set('bmiF05c',22.2);
    //0-6
    storage.set('bmiM06z',14.7); storage.set('bmiM06x',20.5); 
    storage.set('bmiM06c',22.3);
    storage.set('bmiF06z',14.1); storage.set('bmiF06x',20.2); 
    storage.set('bmiF06c',22.3);
    //0-7
    storage.set('bmiM07z',14.8); storage.set('bmiM07x',20.5); 
    storage.set('bmiM07c',22.3);
    storage.set('bmiF07z',14.2); storage.set('bmiF07x',20.3); 
    storage.set('bmiF07c',22.3);
    //0-8
    storage.set('bmiM08z',14.7); storage.set('bmiM08x',20.4); 
    storage.set('bmiM08c',22.3);
    storage.set('bmiF08z',14.1); storage.set('bmiF08x',20.2); 
    storage.set('bmiF08c',22.2);
    //0-9
    storage.set('bmiM09z',14.7); storage.set('bmiM09x',20.3); 
    storage.set('bmiM09c',22.1);
    storage.set('bmiF09z',14.1); storage.set('bmiF09x',20.1); 
    storage.set('bmiF09c',22.1);
    //0-10
    storage.set('bmiM010z',14.6); storage.set('bmiM010x',20.1); 
    storage.set('bmiM010c',22);
    storage.set('bmiF010z',14); storage.set('bmiF010x',19.9); 
    storage.set('bmiF010c',21.9);
    //0-11
    storage.set('bmiM011z',14.5); storage.set('bmiM011x',20); 
    storage.set('bmiM011c',21.8);
    storage.set('bmiF011z',13.9); storage.set('bmiF011x',19.8); 
    storage.set('bmiF011c',21.8);
    //1-0
    storage.set('bmiM10z',14.4); storage.set('bmiM10x',19.8); 
    storage.set('bmiM10c',21.6);
    storage.set('bmiF10z',13.8); storage.set('bmiF10x',19.6); 
    storage.set('bmiF10c',21.6);
    //1-1
    storage.set('bmiM11z',14.3); storage.set('bmiM11x',19.7); 
    storage.set('bmiM11c',21.5);
    storage.set('bmiF11z',13.7); storage.set('bmiF11x',19.5); 
    storage.set('bmiF11c',21.4);
    //1-2
    storage.set('bmiM12z',14.2); storage.set('bmiM12x',19.5); 
    storage.set('bmiM12c',21.3);
    storage.set('bmiF12z',13.6); storage.set('bmiF12x',19.3); 
    storage.set('bmiF12c',21.3);
    //1-3
    storage.set('bmiM13z',14.1); storage.set('bmiM13x',19.4); 
    storage.set('bmiM13c',21.2);
    storage.set('bmiF13z',13.5); storage.set('bmiF13x',19.2); 
    storage.set('bmiF13c',21.1);
    //1-4
    storage.set('bmiM14z',14); storage.set('bmiM14x',19.3); 
    storage.set('bmiM14c',21);
    storage.set('bmiF14z',13.5); storage.set('bmiF14x',19.1); 
    storage.set('bmiF14c',21);
    //1-5
    storage.set('bmiM15z',13.9); storage.set('bmiM15x',19.1); 
    storage.set('bmiM15c',20.9);
    storage.set('bmiF15z',13.4); storage.set('bmiF15x',18.9); 
    storage.set('bmiF15c',20.9);
    //1-6
    storage.set('bmiM16z',13.9); storage.set('bmiM16x',19); 
    storage.set('bmiM16c',20.8);
    storage.set('bmiF16z',13.3); storage.set('bmiF16x',18.8); 
    storage.set('bmiF16c',20.8);
    //1-7
    storage.set('bmiM17z',13.8); storage.set('bmiM17x',18.9); 
    storage.set('bmiM17c',20.7);
    storage.set('bmiF17z',13.3); storage.set('bmiF17x',18.8); 
    storage.set('bmiF17c',20.7);
    //1-8
    storage.set('bmiM18z',13.7); storage.set('bmiM18x',18.8); 
    storage.set('bmiM18c',20.6);
    storage.set('bmiF18z',13.2); storage.set('bmiF18x',18.7); 
    storage.set('bmiF18c',20.6);
    //1-9
    storage.set('bmiM19z',13.7); storage.set('bmiM19x',18.7); 
    storage.set('bmiM19c',20.5);
    storage.set('bmiF19z',13.2); storage.set('bmiF19x',18.6); 
    storage.set('bmiF19c',20.5);
    //1-10
    storage.set('bmiM110z',13.6); storage.set('bmiM110x',18.7); 
    storage.set('bmiM110c',20.4);
    storage.set('bmiF110z',13.1); storage.set('bmiF110x',18.5); 
    storage.set('bmiF110c',20.4);
    //1-11
    storage.set('bmiM111z',13.6); storage.set('bmiM111x',18.6); 
    storage.set('bmiM111c',20.3);
    storage.set('bmiF111z',13.1); storage.set('bmiF111x',18.5); 
    storage.set('bmiF111c',20.4);
    //2-0
    storage.set('bmiM20z',13.6); storage.set('bmiM20x',18.5); 
    storage.set('bmiM20c',20.3);
    storage.set('bmiF20z',13.1); storage.set('bmiF20x',18.4); 
    storage.set('bmiF20c',20.3);
    //2-1
    storage.set('bmiM21z',13.8); storage.set('bmiM21x',18.8); 
    storage.set('bmiM21c',20.5);
    storage.set('bmiF21z',13.3); storage.set('bmiF21x',18.7); 
    storage.set('bmiF21c',20.6);
    //2-2
    storage.set('bmiM22z',13.7); storage.set('bmiM22x',18.8); 
    storage.set('bmiM22c',20.5);
    storage.set('bmiF22z',13.3); storage.set('bmiF22x',18.7); 
    storage.set('bmiF22c',20.6);
    //2-3
    storage.set('bmiM23z',13.7); storage.set('bmiM23x',18.7); 
    storage.set('bmiM23c',20.4);
    storage.set('bmiF23z',13.3); storage.set('bmiF23x',18.6); 
    storage.set('bmiF23c',20.5);
    //2-4
    storage.set('bmiM24z',13.6); storage.set('bmiM24x',18.7); 
    storage.set('bmiM24c',20.4);
    storage.set('bmiF24z',13.3); storage.set('bmiF24x',18.6); 
    storage.set('bmiF24c',20.5);
    //2-5
    storage.set('bmiM25z',13.6); storage.set('bmiM25x',18.6); 
    storage.set('bmiM25c',20.3);
    storage.set('bmiF25z',13.2); storage.set('bmiF25x',18.6); 
    storage.set('bmiF25c',20.4);
    //2-6
    storage.set('bmiM26z',13.6); storage.set('bmiM26x',18.6); 
    storage.set('bmiM26c',20.2);
    storage.set('bmiF26z',13.2); storage.set('bmiF26x',18.5); 
    storage.set('bmiF26c',20.4);
    //2-7
    storage.set('bmiM27z',13.5); storage.set('bmiM27x',18.5); 
    storage.set('bmiM27c',20.2);
    storage.set('bmiF27z',13.2); storage.set('bmiF27x',18.5); 
    storage.set('bmiF27c',20.4);
    //2-8
    storage.set('bmiM28z',13.5); storage.set('bmiM28x',18.5); 
    storage.set('bmiM28c',20.1);
    storage.set('bmiF28z',13.2); storage.set('bmiF28x',18.5); 
    storage.set('bmiF28c',20.4);
    //2-9
    storage.set('bmiM29z',13.5); storage.set('bmiM29x',18.5); 
    storage.set('bmiM29c',20.1);
    storage.set('bmiF29z',13.1); storage.set('bmiF29x',18.5); 
    storage.set('bmiF29c',20.3);
    //2-10
    storage.set('bmiM210z',13.4); storage.set('bmiM210x',18.4); 
    storage.set('bmiM210c',20);
    storage.set('bmiF210z',13.1); storage.set('bmiF210x',18.5); 
    storage.set('bmiF210c',20.3);
    //2-11
    storage.set('bmiM211z',13.4); storage.set('bmiM211x',18.4); 
    storage.set('bmiM211c',20);
    storage.set('bmiF211z',13.1); storage.set('bmiF211x',18.4); 
    storage.set('bmiF211c',20.3);
    //3-0
    storage.set('bmiM30z',13.4); storage.set('bmiM30x',18.4); 
    storage.set('bmiM30c',20);
    storage.set('bmiF30z',13.1); storage.set('bmiF30x',18.4); 
    storage.set('bmiF30c',20.3);
    //3-1
    storage.set('bmiM31z',13.3); storage.set('bmiM31x',18.3); 
    storage.set('bmiM31c',19.9);
    storage.set('bmiF31z',13.1); storage.set('bmiF31x',18.4); 
    storage.set('bmiF31c',20.3);
    //3-2
    storage.set('bmiM32z',13.3); storage.set('bmiM32x',18.3); 
    storage.set('bmiM32c',19.9);
    storage.set('bmiF32z',13); storage.set('bmiF32x',18.4); 
    storage.set('bmiF32c',20.3);
    //3-3
    storage.set('bmiM33z',13.3); storage.set('bmiM33x',18.3); 
    storage.set('bmiM33c',19.9);
    storage.set('bmiF33z',13); storage.set('bmiF33x',18.4); 
    storage.set('bmiF33c',20.3);
    //3-4
    storage.set('bmiM34z',13.2); storage.set('bmiM34x',18.2); 
    storage.set('bmiM34c',19.9);
    storage.set('bmiF34z',13); storage.set('bmiF34x',18.4); 
    storage.set('bmiF34c',20.3);
    //3-5
    storage.set('bmiM35z',13.2); storage.set('bmiM35x',18.2); 
    storage.set('bmiM35c',19.9);
    storage.set('bmiF35z',13); storage.set('bmiF35x',18.4); 
    storage.set('bmiF35c',20.4);
    //3-6
    storage.set('bmiM36z',13.2); storage.set('bmiM36x',18.2); 
    storage.set('bmiM36c',19.9);
    storage.set('bmiF36z',12.9); storage.set('bmiF36x',18.4); 
    storage.set('bmiF36c',20.4);
    //3-7
    storage.set('bmiM37z',13.2); storage.set('bmiM37x',18.2); 
    storage.set('bmiM37c',19.8);
    storage.set('bmiF37z',12.9); storage.set('bmiF37x',18.4); 
    storage.set('bmiF37c',20.4);
    //3-8
    storage.set('bmiM38z',13.1); storage.set('bmiM38x',18.2); 
    storage.set('bmiM38c',19.8);
    storage.set('bmiF38z',12.9); storage.set('bmiF38x',18.5); 
    storage.set('bmiF38c',20.4);
    //3-9
    storage.set('bmiM39z',13.1); storage.set('bmiM39x',18.2); 
    storage.set('bmiM39c',19.8);
    storage.set('bmiF39z',12.9); storage.set('bmiF39x',18.5); 
    storage.set('bmiF39c',20.5);
    //3-10
    storage.set('bmiM310z',13.4); storage.set('bmiM310x',18.2); 
    storage.set('bmiM310c',19.8);
    storage.set('bmiF310z',12.9); storage.set('bmiF310x',18.5); 
    storage.set('bmiF310c',20.5);
    //3-11
    storage.set('bmiM311z',13.1); storage.set('bmiM311x',18.2); 
    storage.set('bmiM311c',19.9);
    storage.set('bmiF311z',12.8); storage.set('bmiF311x',18.5); 
    storage.set('bmiF311c',20.6);
    //4-0
    storage.set('bmiM40z',13.1); storage.set('bmiM40x',18.2); 
    storage.set('bmiM40c',19.9);
    storage.set('bmiF40z',12.8); storage.set('bmiF40x',18.5); 
    storage.set('bmiF40c',20.6);
    //4-1
    storage.set('bmiM41z',13); storage.set('bmiM41x',18.2); 
    storage.set('bmiM41c',19.9);
    storage.set('bmiF41z',12.8); storage.set('bmiF41x',18.5); 
    storage.set('bmiF41c',20.6);
    //4-2
    storage.set('bmiM42z',13); storage.set('bmiM42x',18.2); 
    storage.set('bmiM42c',19.9);
    storage.set('bmiF42z',12.8); storage.set('bmiF42x',18.6); 
    storage.set('bmiF42c',20.7);
    //4-3
    storage.set('bmiM43z',13); storage.set('bmiM43x',18.2); 
    storage.set('bmiM43c',19.9);
    storage.set('bmiF43z',12.8); storage.set('bmiF43x',18.6); 
    storage.set('bmiF43c',20.7);
    //4-4
    storage.set('bmiM44z',13); storage.set('bmiM44x',18.2); 
    storage.set('bmiM44c',19.9);
    storage.set('bmiF44z',12.8); storage.set('bmiF44x',18.6); 
    storage.set('bmiF44c',20.7);
    //4-5
    storage.set('bmiM45z',13); storage.set('bmiM45x',18.2); 
    storage.set('bmiM45c',20);
    storage.set('bmiF45z',12.7); storage.set('bmiF45x',18.6); 
    storage.set('bmiF45c',20.8);
    //4-6
    storage.set('bmiM46z',13); storage.set('bmiM46x',18.2); 
    storage.set('bmiM46c',20);
    storage.set('bmiF46z',12.7); storage.set('bmiF46x',18.7); 
    storage.set('bmiF46c',20.8);
    //4-7
    storage.set('bmiM47z',13); storage.set('bmiM47x',18.2); 
    storage.set('bmiM47c',20);
    storage.set('bmiF47z',12.7); storage.set('bmiF47x',18.7); 
    storage.set('bmiF47c',20.9);
    //4-8
    storage.set('bmiM48z',12.9); storage.set('bmiM48x',18.2); 
    storage.set('bmiM48c',20.1);
    storage.set('bmiF48z',12.7); storage.set('bmiF48x',18.7); 
    storage.set('bmiF48c',20.9);
    //4-9
    storage.set('bmiM49z',12.9); storage.set('bmiM49x',18.2); 
    storage.set('bmiM49c',20.1);
    storage.set('bmiF49z',12.7); storage.set('bmiF49x',18.7); 
    storage.set('bmiF49c',21);
    //4-10
    storage.set('bmiM410z',12.9); storage.set('bmiM410x',18.3); 
    storage.set('bmiM410c',20.2);
    storage.set('bmiF410z',12.7); storage.set('bmiF410x',18.8); 
    storage.set('bmiF410c',21);
    //4-11
    storage.set('bmiM411z',12.9); storage.set('bmiM411x',18.3); 
    storage.set('bmiM411c',20.2);
    storage.set('bmiF411z',12.7); storage.set('bmiF411x',18.8); 
    storage.set('bmiF411c',21);
    //5-0
    storage.set('bmiM50z',12.9); storage.set('bmiM50x',18.3); 
    storage.set('bmiM50c',20.3);
    storage.set('bmiF50z',12.7); storage.set('bmiF50x',18.8); 
    storage.set('bmiF50c',21.1);
    //5-1
    storage.set('bmiM51z',13); storage.set('bmiM51x',18.3); 
    storage.set('bmiM51c',20.2);
    storage.set('bmiF51z',12.7); storage.set('bmiF51x',18.9); 
    storage.set('bmiF51c',21.3);
    //5-2
    storage.set('bmiM52z',13); storage.set('bmiM52x',18.3); 
    storage.set('bmiM52c',20.2);
    storage.set('bmiF52z',12.7); storage.set('bmiF52x',18.9); 
    storage.set('bmiF52c',21.4);
    //5-3
    storage.set('bmiM53z',13); storage.set('bmiM53x',18.3); 
    storage.set('bmiM53c',20.2);
    storage.set('bmiF53z',12.7); storage.set('bmiF53x',18.9); 
    storage.set('bmiF53c',21.5);
    //5-4
    storage.set('bmiM54z',13); storage.set('bmiM54x',18.3); 
    storage.set('bmiM54c',20.3);
    storage.set('bmiF54z',12.7); storage.set('bmiF54x',18.9); 
    storage.set('bmiF54c',21.5);
    //5-5
    storage.set('bmiM55z',13); storage.set('bmiM55x',18.3); 
    storage.set('bmiM55c',20.3);
    storage.set('bmiF55z',12.7); storage.set('bmiF55x',19); 
    storage.set('bmiF55c',21.6);
    //5-6
    storage.set('bmiM56z',13); storage.set('bmiM56x',18.4); 
    storage.set('bmiM56c',20.4);
    storage.set('bmiF56z',12.7); storage.set('bmiF56x',19); 
    storage.set('bmiF56c',21.7);
    //5-7
    storage.set('bmiM57z',13); storage.set('bmiM57x',18.4); 
    storage.set('bmiM57c',20.4);
    storage.set('bmiF57z',12.7); storage.set('bmiF57x',19); 
    storage.set('bmiF57c',21.7);
    //5-8
    storage.set('bmiM58z',13); storage.set('bmiM58x',18.4); 
    storage.set('bmiM58c',20.5);
    storage.set('bmiF58z',12.7); storage.set('bmiF58x',19.1); 
    storage.set('bmiF58c',21.8);
    //5-9
    storage.set('bmiM59z',13); storage.set('bmiM59x',18.4); 
    storage.set('bmiM59c',20.5);
    storage.set('bmiF59z',12.7); storage.set('bmiF59x',19.1); 
    storage.set('bmiF59c',21.9);
    //5-10
    storage.set('bmiM510z',13); storage.set('bmiM510x',18.5); 
    storage.set('bmiM510c',20.6);
    storage.set('bmiF510z',12.7); storage.set('bmiF510x',19.1); 
    storage.set('bmiF510c',22);
    //5-11
    storage.set('bmiM511z',13); storage.set('bmiM511x',18.5); 
    storage.set('bmiM511c',20.6);
    storage.set('bmiF511z',12.7); storage.set('bmiF511x',19.2); 
    storage.set('bmiF511c',22.1);
    //6-0
    storage.set('bmiM60z',13); storage.set('bmiM60x',18.5); 
    storage.set('bmiM60c',20.7);
    storage.set('bmiF60z',12.7); storage.set('bmiF60x',19.2); 
    storage.set('bmiF60c',22.1);
    //6-1
    storage.set('bmiM61z',13); storage.set('bmiM61x',18.6); 
    storage.set('bmiM61c',20.8);
    storage.set('bmiF61z',12.7); storage.set('bmiF61x',19.3); 
    storage.set('bmiF61c',22.2);
    //6-2
    storage.set('bmiM62z',13.1); storage.set('bmiM62x',18.6); 
    storage.set('bmiM62c',20.8);
    storage.set('bmiF62z',12.7); storage.set('bmiF62x',19.3); 
    storage.set('bmiF62c',22.3);
    //6-3
    storage.set('bmiM63z',13.1); storage.set('bmiM63x',18.6); 
    storage.set('bmiM63c',20.9);
    storage.set('bmiF63z',12.7); storage.set('bmiF63x',19.3); 
    storage.set('bmiF63c',22.4);
    //6-4
    storage.set('bmiM64z',13.1); storage.set('bmiM64x',18.7); 
    storage.set('bmiM64c',21);
    storage.set('bmiF64z',12.7); storage.set('bmiF64x',19.4); 
    storage.set('bmiF64c',22.5);
    //6-5
    storage.set('bmiM65z',13.1); storage.set('bmiM65x',18.7); 
    storage.set('bmiM65c',21);
    storage.set('bmiF65z',12.7); storage.set('bmiF65x',19.4); 
    storage.set('bmiF65c',22.6);
    //6-6
    storage.set('bmiM66z',13.1); storage.set('bmiM66x',18.7); 
    storage.set('bmiM66c',21.1);
    storage.set('bmiF66z',12.7); storage.set('bmiF66x',19.5); 
    storage.set('bmiF66c',22.7);
    //6-7
    storage.set('bmiM67z',13.1); storage.set('bmiM67x',18.8); 
    storage.set('bmiM67c',21.2);
    storage.set('bmiF67z',12.7); storage.set('bmiF67x',19.5); 
    storage.set('bmiF67c',22.8);
    //6-8
    storage.set('bmiM68z',13.1); storage.set('bmiM68x',18.8); 
    storage.set('bmiM68c',21.3);
    storage.set('bmiF68z',12.7); storage.set('bmiF68x',19.6); 
    storage.set('bmiF68c',22.9);
    //6-9
    storage.set('bmiM69z',13.1); storage.set('bmiM69x',18.9); 
    storage.set('bmiM69c',21.3);
    storage.set('bmiF69z',12.7); storage.set('bmiF69x',19.6); 
    storage.set('bmiF69c',23);
    //6-10
    storage.set('bmiM610z',13.1); storage.set('bmiM610x',18.9); 
    storage.set('bmiM610c',21.4);
    storage.set('bmiF610z',12.7); storage.set('bmiF610x',19.7); 
    storage.set('bmiF610c',23.1);
    //6-11
    storage.set('bmiM611z',13.1); storage.set('bmiM611x',19); 
    storage.set('bmiM611c',21.5);
    storage.set('bmiF611z',12.7); storage.set('bmiF611x',19.7); 
    storage.set('bmiF611c',23.2);
    //7-0
    storage.set('bmiM70z',13.1); storage.set('bmiM70x',19); 
    storage.set('bmiM70c',21.6);
    storage.set('bmiF70z',12.7); storage.set('bmiF70x',19.8); 
    storage.set('bmiF70c',23.3);
    //7-1
    storage.set('bmiM71z',13.2); storage.set('bmiM71x',19.1); 
    storage.set('bmiM71c',21.7);
    storage.set('bmiF71z',12.7); storage.set('bmiF71x',19.8); 
    storage.set('bmiF71c',23.4);
    //7-2
    storage.set('bmiM72z',13.2); storage.set('bmiM72x',19.1); 
    storage.set('bmiM72c',21.8);
    storage.set('bmiF72z',12.8); storage.set('bmiF72x',19.9); 
    storage.set('bmiF72c',23.5);
    //7-3
    storage.set('bmiM73z',13.2); storage.set('bmiM73x',19.2); 
    storage.set('bmiM73c',21.9);
    storage.set('bmiF73z',12.8); storage.set('bmiF73x',20); 
    storage.set('bmiF73c',23.6);
    //7-4
    storage.set('bmiM74z',13.2); storage.set('bmiM74x',19.2); 
    storage.set('bmiM74c',22);
    storage.set('bmiF74z',12.8); storage.set('bmiF74x',20); 
    storage.set('bmiF74c',23.7);
    //7-5
    storage.set('bmiM75z',13.2); storage.set('bmiM75x',19.3); 
    storage.set('bmiM75c',22);
    storage.set('bmiF75z',12.8); storage.set('bmiF75x',20.1); 
    storage.set('bmiF75c',23.9);
    //7-6
    storage.set('bmiM76z',13.2); storage.set('bmiM76x',19.3); 
    storage.set('bmiM76c',22.1);
    storage.set('bmiF76z',12.8); storage.set('bmiF76x',20.1); 
    storage.set('bmiF76c',24);
    //7-7
    storage.set('bmiM77z',13.2); storage.set('bmiM77x',19.4); 
    storage.set('bmiM77c',22.2);
    storage.set('bmiF77z',12.8); storage.set('bmiF77x',20.2); 
    storage.set('bmiF77c',24.1);
    //7-8
    storage.set('bmiM78z',13.3); storage.set('bmiM78x',19.4); 
    storage.set('bmiM78c',22.4);
    storage.set('bmiF78z',12.8); storage.set('bmiF78x',20.3); 
    storage.set('bmiF78c',24.2);
    //7-9
    storage.set('bmiM79z',13.3); storage.set('bmiM79x',19.5); 
    storage.set('bmiM79c',22.5);
    storage.set('bmiF79z',12.8); storage.set('bmiF79x',20.3); 
    storage.set('bmiF79c',24.4);
    //7-10
    storage.set('bmiM710z',13.3); storage.set('bmiM710x',19.6); 
    storage.set('bmiM710c',22.6);
    storage.set('bmiF710z',12.9); storage.set('bmiF710x',20.4); 
    storage.set('bmiF710c',24.5);
    //7-11
    storage.set('bmiM711z',13.3); storage.set('bmiM711x',19.6); 
    storage.set('bmiM711c',22.7);
    storage.set('bmiF711z',12.9); storage.set('bmiF711x',20.5); 
    storage.set('bmiF711c',24.6);
    //8-0
    storage.set('bmiM80z',13.3); storage.set('bmiM80x',19.7); 
    storage.set('bmiM80c',22.8);
    storage.set('bmiF80z',12.9); storage.set('bmiF80x',20.6); 
    storage.set('bmiF80c',24.8);
    //8-1
    storage.set('bmiM81z',13.3); storage.set('bmiM81x',19.7); 
    storage.set('bmiM81c',22.9);
    storage.set('bmiF81z',12.9); storage.set('bmiF81x',20.6); 
    storage.set('bmiF81c',24.9);
    //8-2
    storage.set('bmiM82z',13.3); storage.set('bmiM82x',19.8); 
    storage.set('bmiM82c',23);
    storage.set('bmiF82z',12.9); storage.set('bmiF82x',20.7); 
    storage.set('bmiF82c',25.1)
    //8-3
    storage.set('bmiM83z',13.3); storage.set('bmiM83x',19.9); 
    storage.set('bmiM83c',23.1);
    storage.set('bmiF83z',12.9); storage.set('bmiF83x',20.8); 
    storage.set('bmiF83c',25.2);
    //8-4
    storage.set('bmiM84z',13.4); storage.set('bmiM84x',19.9); 
    storage.set('bmiM84c',23.3);
    storage.set('bmiF84z',13); storage.set('bmiF84x',20.9); 
    storage.set('bmiF84c',25.3);
    //8-5
    storage.set('bmiM85z',13.4); storage.set('bmiM85x',20); 
    storage.set('bmiM85c',23.4);
    storage.set('bmiF85z',13); storage.set('bmiF85x',20.9); 
    storage.set('bmiF85c',25.5);
    //8-6
    storage.set('bmiM86z',13.4); storage.set('bmiM86x',20.1); 
    storage.set('bmiM86c',23.5);
    storage.set('bmiF86z',13); storage.set('bmiF86x',21.0); 
    storage.set('bmiF86c',25.6);
    //8-7
    storage.set('bmiM87z',13.4); storage.set('bmiM87x',20.1); 
    storage.set('bmiM87c',23.6);
    storage.set('bmiF87z',13.0); storage.set('bmiF87x',21.1); 
    storage.set('bmiF87c',25.8);
    //8-8
    storage.set('bmiM88z',13.4); storage.set('bmiM88x',20.2); 
    storage.set('bmiM88c',23.8);
    storage.set('bmiF88z',13.0); storage.set('bmiF88x',21.2); 
    storage.set('bmiF88c',25.9);
    //8-9
    storage.set('bmiM89z',13.4); storage.set('bmiM89x',20.3); 
    storage.set('bmiM89c',23.9);
    storage.set('bmiF89z',13.1); storage.set('bmiF89x',21.3); 
    storage.set('bmiF89c',26.1);
    //8-10
    storage.set('bmiM810z',13.5); storage.set('bmiM810x',20.3); 
    storage.set('bmiM810c',24.0);
    storage.set('bmiF810z',13.1); storage.set('bmiF810x',21.3); 
    storage.set('bmiF810c',26.2);
    //8-11
    storage.set('bmiM811z',13.5); storage.set('bmiM811x',20.4); 
    storage.set('bmiM811c',24.2);
    storage.set('bmiF811z',13.1); storage.set('bmiF811x',21.4); 
    storage.set('bmiF811c',26.4);
    //9-0
    storage.set('bmiM90z',13.5); storage.set('bmiM90x',20.5); 
    storage.set('bmiM90c',24.3);
    storage.set('bmiF90z',13.1); storage.set('bmiF90x',21.5); 
    storage.set('bmiF90c',26.5);
    //9-1
    storage.set('bmiM91z',13.5); storage.set('bmiM91x',20.5); 
    storage.set('bmiM91c',24.4);
    storage.set('bmiF91z',13.2); storage.set('bmiF91x',21.6); 
    storage.set('bmiF91c',26.7);
    //9-2
    storage.set('bmiM92z',13.5); storage.set('bmiM92x',20.6); 
    storage.set('bmiM92c',24.6);
    storage.set('bmiF92z',13.2); storage.set('bmiF92x',21.7); 
    storage.set('bmiF92c',26.8)
    //9-3
    storage.set('bmiM93z',13.5); storage.set('bmiM93x',20.7); 
    storage.set('bmiM93c',24.7);
    storage.set('bmiF93z',13.2); storage.set('bmiF93x',21.8); 
    storage.set('bmiF93c',27.0);
    //9-4
    storage.set('bmiM94z',13.6); storage.set('bmiM94x',20.8); 
    storage.set('bmiM94c',24.9);
    storage.set('bmiF94z',13.2); storage.set('bmiF94x',21.9); 
    storage.set('bmiF94c',27.2);
    //9-5
    storage.set('bmiM95z',13.6); storage.set('bmiM95x',20.8); 
    storage.set('bmiM95c',25.0);
    storage.set('bmiF95z',13.3); storage.set('bmiF95x',21.9); 
    storage.set('bmiF95c',27.3);
    //9-6
    storage.set('bmiM96z',13.6); storage.set('bmiM96x',20.9); 
    storage.set('bmiM96c',25.1);
    storage.set('bmiF96z',13.3); storage.set('bmiF96x',22.0); 
    storage.set('bmiF96c',27.5);
    //9-7
    storage.set('bmiM97z',13.6); storage.set('bmiM97x',21.0); 
    storage.set('bmiM97c',25.3);
    storage.set('bmiF97z',13.3); storage.set('bmiF97x',22.1); 
    storage.set('bmiF97c',27.6);
    //9-8
    storage.set('bmiM98z',13.6); storage.set('bmiM98x',21.1); 
    storage.set('bmiM98c',25.5);
    storage.set('bmiF98z',13.4); storage.set('bmiF98x',22.2); 
    storage.set('bmiF98c',27.8);
    //9-9
    storage.set('bmiM99z',13.7); storage.set('bmiM99x',21.2); 
    storage.set('bmiM99c',25.6);
    storage.set('bmiF99z',13.4); storage.set('bmiF99x',22.3); 
    storage.set('bmiF99c',27.9);
    //9-10
    storage.set('bmiM910z',13.7); storage.set('bmiM910x',21.2); 
    storage.set('bmiM910c',25.8);
    storage.set('bmiF910z',13.4); storage.set('bmiF910x',22.4); 
    storage.set('bmiF910c',28.1);
    //9-11
    storage.set('bmiM911z',13.7); storage.set('bmiM911x',21.3); 
    storage.set('bmiM911c',25.9);
    storage.set('bmiF911z',13.4); storage.set('bmiF911x',22.5); 
    storage.set('bmiF911c',28.2);
    //10-0
    storage.set('bmiM100z',13.7); storage.set('bmiM100x',21.4); 
    storage.set('bmiM100c',26.1);
    storage.set('bmiF100z',13.4); storage.set('bmiF100x',22.6); 
    storage.set('bmiF100c',28.4);
    //10-1
    storage.set('bmiM101z',13.8); storage.set('bmiM101x',21.5); 
    storage.set('bmiM101c',26.2);
    storage.set('bmiF101z',13.5); storage.set('bmiF101x',22.7); 
    storage.set('bmiF101c',28.5);
    //10-2
    storage.set('bmiM102z',13.8); storage.set('bmiM102x',21.6); 
    storage.set('bmiM102c',26.4);
    storage.set('bmiF102z',13.5); storage.set('bmiF102x',22.8); 
    storage.set('bmiF102c',28.7)
    //10-3
    storage.set('bmiM103z',13.8); storage.set('bmiM103x',21.7); 
    storage.set('bmiM103c',26.6);
    storage.set('bmiF103z',13.6); storage.set('bmiF103x',22.8); 
    storage.set('bmiF103c',28.8);
    //10-4
    storage.set('bmiM104z',13.8); storage.set('bmiM104x',21.7); 
    storage.set('bmiM104c',26.7);
    storage.set('bmiF104z',13.6); storage.set('bmiF104x',22.9); 
    storage.set('bmiF104c',29.0);
    //10-5
    storage.set('bmiM105z',13.9); storage.set('bmiM105x',21.8); 
    storage.set('bmiM105c',26.9);
    storage.set('bmiF105z',13.6); storage.set('bmiF105x',23.0); 
    storage.set('bmiF105c',29.1);
    //10-6
    storage.set('bmiM106z',13.9); storage.set('bmiM106x',21.9); 
    storage.set('bmiM106c',27.0);
    storage.set('bmiF106z',13.7); storage.set('bmiF106x',23.1); 
    storage.set('bmiF106c',29.3);
    //10-7
    storage.set('bmiM107z',13.9); storage.set('bmiM107x',22.0); 
    storage.set('bmiM107c',27.2);
    storage.set('bmiF107z',13.7); storage.set('bmiF107x',23.2); 
    storage.set('bmiF107c',29.4);
    //10-8
    storage.set('bmiM108z',13.9); storage.set('bmiM108x',22.1); 
    storage.set('bmiM108c',27.4);
    storage.set('bmiF108z',13.7); storage.set('bmiF108x',23.3); 
    storage.set('bmiF108c',29.6);
    //10-9
    storage.set('bmiM109z',14.0); storage.set('bmiM109x',22.2); 
    storage.set('bmiM109c',27.5);
    storage.set('bmiF109z',13.8); storage.set('bmiF109x',23.4); 
    storage.set('bmiF109c',29.7);
    //10-10
    storage.set('bmiM1010z',14.0); storage.set('bmiM1010x',22.3); 
    storage.set('bmiM1010c',27.7);
    storage.set('bmiF1010z',13.8); storage.set('bmiF1010x',23.5); 
    storage.set('bmiF1010c',29.9);
    //10-11
    storage.set('bmiM1011z',14.0); storage.set('bmiM1011x',22.4); 
    storage.set('bmiM1011c',27.9);
    storage.set('bmiF1011z',13.8); storage.set('bmiF1011x',23.6); 
    storage.set('bmiF1011c',30.0);
    //11-0
    storage.set('bmiM110z',14.1); storage.set('bmiM110x',22.5); 
    storage.set('bmiM110c',28.0);
    storage.set('bmiF110z',13.9); storage.set('bmiF110x',23.7); 
    storage.set('bmiF110c',30.2);
    //11-1
    storage.set('bmiM111z',14.1); storage.set('bmiM111x',22.5); 
    storage.set('bmiM111c',28.2);
    storage.set('bmiF111z',13.9); storage.set('bmiF111x',23.8); 
    storage.set('bmiF111c',30.3);
    //11-2
    storage.set('bmiM112z',14.1); storage.set('bmiM112x',22.6); 
    storage.set('bmiM112c',28.4);
    storage.set('bmiF112z',14.0); storage.set('bmiF112x',23.9); 
    storage.set('bmiF112c',30.5)
    //11-3
    storage.set('bmiM113z',14.1); storage.set('bmiM113x',22.7); 
    storage.set('bmiM113c',28.5);
    storage.set('bmiF113z',14.0); storage.set('bmiF113x',24.0); 
    storage.set('bmiF113c',30.6);
    //11-4
    storage.set('bmiM114z',14.2); storage.set('bmiM114x',22.8); 
    storage.set('bmiM114c',28.7);
    storage.set('bmiF114z',14.0); storage.set('bmiF114x',24.1); 
    storage.set('bmiF114c',30.8);
    //11-5
    storage.set('bmiM115z',14.2); storage.set('bmiM115x',22.9); 
    storage.set('bmiM115c',28.8);
    storage.set('bmiF115z',14.1); storage.set('bmiF115x',24.2); 
    storage.set('bmiF115c',30.9);
    //11-6
    storage.set('bmiM116z',14.2); storage.set('bmiM116x',23.0); 
    storage.set('bmiM116c',29.0);
    storage.set('bmiF116z',14.1); storage.set('bmiF116x',24.3); 
    storage.set('bmiF116c',31.1);
    //11-7
    storage.set('bmiM117z',14.3); storage.set('bmiM117x',23.1); 
    storage.set('bmiM117c',29.2);
    storage.set('bmiF117z',14.2); storage.set('bmiF117x',24.4); 
    storage.set('bmiF117c',31.2);
    //11-8
    storage.set('bmiM118z',14.3); storage.set('bmiM118x',23.2); 
    storage.set('bmiM118c',29.3);
    storage.set('bmiF118z',14.2); storage.set('bmiF118x',24.5); 
    storage.set('bmiF118c',31.4);
    //11-9
    storage.set('bmiM119z',14.3); storage.set('bmiM119x',23.3); 
    storage.set('bmiM119c',29.5);
    storage.set('bmiF119z',14.3); storage.set('bmiF119x',24.7); 
    storage.set('bmiF119c',31.5);
    //11-10
    storage.set('bmiM1110z',14.4); storage.set('bmiM1110x',23.4); 
    storage.set('bmiM1110c',29.6);
    storage.set('bmiF1110z',14.3); storage.set('bmiF1110x',24.8); 
    storage.set('bmiF1110c',31.6);
    //11-11
    storage.set('bmiM1111z',14.4); storage.set('bmiM1111x',23.5); 
    storage.set('bmiM1111c',29.8);
    storage.set('bmiF1111z',14.3); storage.set('bmiF1111x',24.9); 
    storage.set('bmiF1111c',31.8);
    //12-0
    storage.set('bmiM120z',14.5); storage.set('bmiM120x',23.6); 
    storage.set('bmiM120c',30.0);
    storage.set('bmiF120z',14.4); storage.set('bmiF120x',25.0); 
    storage.set('bmiF120c',31.9);
    //12-1
    storage.set('bmiM121z',14.5); storage.set('bmiM121x',23.7); 
    storage.set('bmiM121c',30.1);
    storage.set('bmiF121z',14.4); storage.set('bmiF121x',25.1); 
    storage.set('bmiF121c',32.0);
    //12-2
    storage.set('bmiM122z',14.5); storage.set('bmiM122x',23.8); 
    storage.set('bmiM122c',30.3);
    storage.set('bmiF122z',14.5); storage.set('bmiF122x',25.2); 
    storage.set('bmiF122c',32.2)
    //12-3
    storage.set('bmiM123z',14.6); storage.set('bmiM123x',23.9); 
    storage.set('bmiM123c',30.4);
    storage.set('bmiF123z',14.5); storage.set('bmiF123x',25.3); 
    storage.set('bmiF123c',32.3);
    //12-4
    storage.set('bmiM124z',14.6); storage.set('bmiM124x',24.0); 
    storage.set('bmiM124c',30.6);
    storage.set('bmiF124z',14.6); storage.set('bmiF124x',25.4); 
    storage.set('bmiF124c',32.4);
    //12-5
    storage.set('bmiM125z',14.6); storage.set('bmiM125x',24.1); 
    storage.set('bmiM125c',30.7);
    storage.set('bmiF125z',14.6); storage.set('bmiF125x',25.5); 
    storage.set('bmiF125c',32.6);
    //12-6
    storage.set('bmiM126z',14.7); storage.set('bmiM126x',24.2); 
    storage.set('bmiM126c',30.9);
    storage.set('bmiF126z',14.7); storage.set('bmiF126x',25.6); 
    storage.set('bmiF126c',32.7);
    //12-7
    storage.set('bmiM127z',14.7); storage.set('bmiM127x',24.3); 
    storage.set('bmiM127c',31.0);
    storage.set('bmiF127z',14.7); storage.set('bmiF127x',25.7); 
    storage.set('bmiF127c',32.8);
    //12-8
    storage.set('bmiM128z',14.8); storage.set('bmiM128x',24.4); 
    storage.set('bmiM128c',31.1);
    storage.set('bmiF128z',14.8); storage.set('bmiF128x',25.8); 
    storage.set('bmiF128c',33.0);
    //12-9
    storage.set('bmiM129z',14.8); storage.set('bmiM129x',24.5); 
    storage.set('bmiM129c',31.3);
    storage.set('bmiF129z',14.8); storage.set('bmiF129x',25.9); 
    storage.set('bmiF129c',33.1);
    //12-10
    storage.set('bmiM1210z',14.8); storage.set('bmiM1210x',24.6); 
    storage.set('bmiM1210c',31.4);
    storage.set('bmiF1210z',14.8); storage.set('bmiF1210x',26.0); 
    storage.set('bmiF1210c',33.2);
    //12-11
    storage.set('bmiM1211z',14.9); storage.set('bmiM1211x',24.7); 
    storage.set('bmiM1211c',31.6);
    storage.set('bmiF1211z',14.9); storage.set('bmiF1211x',26.1); 
    storage.set('bmiF1211c',33.3);
    //13-0
    storage.set('bmiM130z',14.9); storage.set('bmiM130x',24.8); 
    storage.set('bmiM130c',31.7);
    storage.set('bmiF130z',14.9); storage.set('bmiF130x',26.2); 
    storage.set('bmiF130c',33.4);
    //13-1
    storage.set('bmiM131z',15.0); storage.set('bmiM131x',24.9); 
    storage.set('bmiM131c',31.8);
    storage.set('bmiF131z',15.0); storage.set('bmiF131x',26.3); 
    storage.set('bmiF131c',33.6);
    //13-2
    storage.set('bmiM132z',15.0); storage.set('bmiM132x',25.0); 
    storage.set('bmiM132c',31.9);
    storage.set('bmiF132z',15.0); storage.set('bmiF132x',26.4); 
    storage.set('bmiF132c',33.7)
    //13-3
    storage.set('bmiM133z',15.1); storage.set('bmiM133x',25.1); 
    storage.set('bmiM133c',32.1);
    storage.set('bmiF133z',15.1); storage.set('bmiF133x',26.5); 
    storage.set('bmiF133c',33.8);
    //13-4
    storage.set('bmiM134z',15.1); storage.set('bmiM134x',25.2); 
    storage.set('bmiM134c',32.2);
    storage.set('bmiF134z',15.1); storage.set('bmiF134x',26.6); 
    storage.set('bmiF134c',33.9);
    //13-5
    storage.set('bmiM135z',15.2); storage.set('bmiM135x',25.2); 
    storage.set('bmiM135c',32.3);
    storage.set('bmiF135z',15.2); storage.set('bmiF135x',26.7); 
    storage.set('bmiF135c',34.0);
    //13-6
    storage.set('bmiM136z',15.2); storage.set('bmiM136x',25.3); 
    storage.set('bmiM136c',32.4);
    storage.set('bmiF136z',15.2); storage.set('bmiF136x',26.8); 
    storage.set('bmiF136c',34.1);
    //13-7
    storage.set('bmiM137z',15.2); storage.set('bmiM137x',25.4); 
    storage.set('bmiM137c',32.6);
    storage.set('bmiF137z',15.2); storage.set('bmiF137x',26.9); 
    storage.set('bmiF137c',34.2);
    //13-8
    storage.set('bmiM138z',15.3); storage.set('bmiM138x',25.5); 
    storage.set('bmiM138c',32.7);
    storage.set('bmiF138z',15.3); storage.set('bmiF138x',27.0); 
    storage.set('bmiF138c',34.3);
    //13-9
    storage.set('bmiM139z',15.3); storage.set('bmiM139x',25.6); 
    storage.set('bmiM139c',32.8);
    storage.set('bmiF139z',15.3); storage.set('bmiF139x',27.1); 
    storage.set('bmiF139c',34.4);
    //13-10
    storage.set('bmiM1310z',15.4); storage.set('bmiM1310x',25.7); 
    storage.set('bmiM1310c',32.9);
    storage.set('bmiF1310z',15.4); storage.set('bmiF1310x',27.1); 
    storage.set('bmiF1310c',34.5);
    //13-11
    storage.set('bmiM1311z',15.4); storage.set('bmiM1311x',25.8); 
    storage.set('bmiM1311c',33.0);
    storage.set('bmiF1311z',15.4); storage.set('bmiF1311x',27.2); 
    storage.set('bmiF1311c',34.6);
    //14-0
    storage.set('bmiM140z',15.5); storage.set('bmiM140x',25.9); 
    storage.set('bmiM140c',33.1);
    storage.set('bmiF140z',15.4); storage.set('bmiF140x',27.3); 
    storage.set('bmiF140c',34.7);
    //14-1
    storage.set('bmiM141z',15.5); storage.set('bmiM141x',26.0); 
    storage.set('bmiM141c',33.2);
    storage.set('bmiF141z',15.5); storage.set('bmiF141x',27.4); 
    storage.set('bmiF141c',34.7);
    //14-2
    storage.set('bmiM142z',15.6); storage.set('bmiM142x',26.1); 
    storage.set('bmiM142c',33.3);
    storage.set('bmiF142z',15.5); storage.set('bmiF142x',27.5); 
    storage.set('bmiF142c',34.8)
    //14-3
    storage.set('bmiM143z',15.6); storage.set('bmiM143x',26.2); 
    storage.set('bmiM143c',33.4);
    storage.set('bmiF143z',15.6); storage.set('bmiF143x',27.6); 
    storage.set('bmiF143c',34.9);
    //14-4
    storage.set('bmiM144z',15.6); storage.set('bmiM144x',26.3); 
    storage.set('bmiM144c',33.5);
    storage.set('bmiF144z',15.6); storage.set('bmiF144x',27.7); 
    storage.set('bmiF144c',35.0);
    //14-5
    storage.set('bmiM145z',15.7); storage.set('bmiM145x',26.4); 
    storage.set('bmiM145c',33.5);
    storage.set('bmiF145z',15.6); storage.set('bmiF145x',27.7); 
    storage.set('bmiF145c',35.1);
    //14-6
    storage.set('bmiM146z',15.7); storage.set('bmiM146x',26.5); 
    storage.set('bmiM146c',33.6);
    storage.set('bmiF146z',15.7); storage.set('bmiF146x',27.8); 
    storage.set('bmiF146c',35.1);
    //14-7
    storage.set('bmiM147z',15.8); storage.set('bmiM147x',25.4); 
    storage.set('bmiM147c',32.6);
    storage.set('bmiF147z',15.2); storage.set('bmiF147x',26.9); 
    storage.set('bmiF147c',34.2);
    //14-8
    storage.set('bmiM148z',15.8); storage.set('bmiM148x',25.5); 
    storage.set('bmiM148c',32.7);
    storage.set('bmiF148z',15.3); storage.set('bmiF148x',27.0); 
    storage.set('bmiF148c',34.3);
    //14-9
    storage.set('bmiM149z',15.9); storage.set('bmiM149x',25.6); 
    storage.set('bmiM149c',32.8);
    storage.set('bmiF149z',15.3); storage.set('bmiF149x',27.1); 
    storage.set('bmiF149c',34.4);
    //14-10
    storage.set('bmiM1410z',15.9); storage.set('bmiM1410x',25.7); 
    storage.set('bmiM1410c',32.9);
    storage.set('bmiF1410z',15.4); storage.set('bmiF1410x',27.1); 
    storage.set('bmiF1410c',34.5);
    //14-11
    storage.set('bmiM1411z',16.0); storage.set('bmiM1411x',25.8); 
    storage.set('bmiM1411c',33.0);
    storage.set('bmiF1411z',15.4); storage.set('bmiF1411x',27.2); 
    storage.set('bmiF1411c',34.6);
    //15-0
    storage.set('bmiM150z',16.0); storage.set('bmiM150x',25.9); 
    storage.set('bmiM150c',33.1);
    storage.set('bmiF150z',15.4); storage.set('bmiF150x',27.3); 
    storage.set('bmiF150c',34.7);
    


    // storage.get('bmiM20z').then((val) => {
    //   console.log('Your age is', val);
    // });
    // storage.get('bmiM19z').then((val) => {
    //   console.log('Your age is', val);
    // });
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
