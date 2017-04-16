import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Results page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})
export class ResultsPage {
  bmiCard : any;
  dbwCard : any;
  energyCard : any;
  waistCirCard : any;
  waistHipCard : any;
  waistHeightCard : any;
  bmiMessage: string;
  bmiAbnormal: boolean;
  bmiNormal: boolean;
  bmiStatus: string;
  waistHeightRatio;
  waistHeightStatus: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bmiCard = navParams.get('bmiCard');
    this.dbwCard = navParams.get('dbwCard');
    this.energyCard = navParams.get('energyCard');
    this.waistCirCard = navParams.get('waistCirCard');
    this.waistHeightCard = navParams.get('waistHeightCard');
    this.waistHipCard = navParams.get('waistHipCard');
    this.bmiMessage = navParams.get('bmiMessage');
    this.bmiAbnormal = navParams.get('bmiAbnormal');
    this.bmiNormal = navParams.get('bmiNormal');
    this.bmiStatus = navParams.get('bmiStatus');
    this.waistHeightRatio = navParams.get('waistHeightRatio');
    this.waistHeightStatus = navParams.get('waistHeightRatio');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
    console.log(this.bmiMessage);
  }

}
