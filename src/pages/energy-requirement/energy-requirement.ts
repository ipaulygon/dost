import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  ageRange:any = "--Age Group--";

  height:any = 122;
  heightMin: any = 122;
  heightMax: any = 243;
  unitMeasure: any = "Centimeters";
  unitMeasureAbbrev:any = 'cm';

  energyRqmt: any;

  formGroup: FormGroup;

  isAdult = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder) {
    this.formGroup = formBuilder.group({
      gender: ['', Validators.compose([Validators.required])],
      ageRange: ['', Validators.compose([Validators.required])],
      unitMeasure: ['',Validators.compose([Validators.required])],
      height: ['',Validators.compose([Validators.pattern('/^[0-9]+(\.[0-9]{1,2})?$/'),Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnergyRequirementPage');
  }

  ageRangeChanged(){
    if(this.ageRange == "19+"){
      this.isAdult = true;
    }
    else{
      this.isAdult = false;
    }
  }

  unitChanged(){
    if(this.unitMeasure == 'Centimeters'){
      this.heightMin = 122;
      this.heightMax = 243;
      this.unitMeasureAbbrev = 'cm';
    }
    else if(this.unitMeasure == 'Feet'){
      this.heightMin = 4;
      this.heightMax = 8;
      this.unitMeasureAbbrev = 'ft';
    } 
    else if(this.unitMeasure == 'Inches'){
      this.heightMin = 48;
      this.heightMax = 95;
      this.unitMeasureAbbrev = 'in';
    }
  }//end of unitChanged

  isFormComplete(){
     if(this.formGroup.valid){
      if(this.gender == 'Male'){
        if(this.ageRange == '1-2'){
          this.energyRqmt = '1000 kcal';
        }
        else if(this.ageRange == '3-5'){
          this.energyRqmt = '1350 kcal';
        }
      }
      else{

      }
     }//if formgroup is valid
  }


}
