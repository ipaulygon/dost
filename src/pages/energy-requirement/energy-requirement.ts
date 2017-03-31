import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the EnergyRequirement page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-energy-requirement',
  templateUrl: 'energy-requirement.html'
})
export class EnergyRequirementPage {

  gender:any = "Male";
  ageRange:any;

  height:any;
  heightMin: any;
  heightMax: any;
  unitMeasure: any = "--Select Unit--";
  unitMeasureAbbrev: any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnergyRequirementPage');
  }

  unitChanged(){
    if(this.unitMeasure == 'Centimeters'){
      this.heightMin = 122;
      this.heightMax = 243;
      this.unitMeasureAbbrev = 'cm';
    }
    else if(this.unitMeasure == 'Feet'){
      this.heightMin = 4;
      this.heightMax = 7.97;
      this.unitMeasureAbbrev = 'ft';
    } 
    else if(this.unitMeasure == 'Inches'){
      this.heightMin = 48.03;
      this.heightMax = 95.67;
      this.unitMeasureAbbrev = 'in';
    }
  }

}
