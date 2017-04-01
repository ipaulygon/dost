import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

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

  height: number = 122;
  heightMin: any = 122;
  heightMax: any = 243;
  unitMeasure: any = "Centimeters";
  unitMeasureAbbrev:any = 'cm';

  energyRqmt: any;

  physicalActivity: any;
  physicalActivityDesc: any;
  physicalActivityValue: number;

  desirableBodyWeightKg: any;
  desirableBodyWeightLb: any;

  formGroup: FormGroup;
  adultFormGroup: FormGroup;

  isAdult = false;
  showOutput = false;
  heightValid = false;

  inputMinLength = 3;
  inputMaxLength = 6;


  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public formBuilder:FormBuilder, public toastCtrl:ToastController,
              public alertCtrl:AlertController) {
    this.formGroup = formBuilder.group({
      gender: ['', Validators.compose([Validators.required])],
      ageRange: ['', Validators.compose([Validators.required])]
    });

    this.adultFormGroup = formBuilder.group({
      height: ['',Validators.compose([Validators.required])],
      physicalActivity: ['',Validators.compose([Validators.required])]
   });

   	this.adultFormGroup.valueChanges
		.debounceTime(3000)
		.subscribe(data => this.heightChanged());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnergyRequirementPage');
  }

  genderChanged(){
    this.showOutput = false;
    this.submit();
  }

  ageRangeChanged(){
    this.showOutput = false;
    if(this.ageRange == "19+"){
      this.showOutput = false;
      this.isAdult = true;
    }
    else{
      this.isAdult = false;
    }
    this.submit();
  }

  unitChanged(){
    
    this.showOutput = false;
    if(this.unitMeasure == 'Centimeters'){
      this.heightMin = 122;
      this.heightMax = 243;
      this.unitMeasureAbbrev = 'cm';
      this.inputMinLength = 3;
      this.inputMaxLength = 6;
    }
    else if(this.unitMeasure == 'Feet'){
      this.heightMin = 4;
      this.heightMax = 8;
      this.unitMeasureAbbrev = 'ft';
      this.inputMinLength = 1;
      this.inputMaxLength = 3;
    } 
    else if(this.unitMeasure == 'Inches'){
      this.heightMin = 48;
      this.heightMax = 95;
      this.unitMeasureAbbrev = 'in';
      this.inputMinLength = 2;
      this.inputMaxLength = 4;
    }
    this.submit();
  }//end of unitChanged

  heightChanged(){
    
    this.heightValid = false;
    this.showOutput = false;

    let alert = this.alertCtrl.create({
      message: "Please enter a valid number greater than 121.9 cm but less than 243.8 cm or a number with atleast 2 decimal places.",
      buttons: 
      [{
          text: 'Ok',
          handler: data => {
          }
        }]
    });

    if(this.unitMeasure == "Centimeters"){
      if((Number(this.height) > 121) && (Number(this.height) < 243.01)){
        this.heightValid = true;
      }
      else{
        alert.present();
      }
    }
    else if(this.unitMeasure == "Feet"){
      if((Number(this.height) > 3) && (Number(this.height) < 8.01)){
        this.heightValid = true;
      }
      else{
        alert.present();
      }
    }
    else if(this.unitMeasure == "Inches"){
      if((Number(this.height) > 47) && (Number(this.height) < 95.01)){
        this.heightValid = true;
      }
      else{
        alert.present();
      }
    }
    this.submit();
  }//end of height changed

  physicalActivityChanged(){
    if(this.physicalActivity == "Sedentary"){
      this.physicalActivityDesc = "Driving, computer work, ironing, cooking; sits and stands most of the day;" +
                    "rarely gets any physical activity during the whole day.";
      this.physicalActivityValue = 30;
    }
    else if (this.physicalActivity == "Light"){
      this.physicalActivityDesc = "Child care, garage work, electrical trades exercises or walks 3-5 times per week at a slow pace of 2.5 - 3 mph for less than 30 minutes per session.";
      this.physicalActivityValue = 35;
  }
    else if (this.physicalActivity == "Moderate"){
      this.physicalActivityDesc = "Heavy housework, yard work, carrying a load, cycling, tennis, dancing; exercises or walks 3.5 - 4 mph for one hour 3-5 times per week.";
      this.physicalActivityValue = 40;
   }
    else if (this.physicalActivity == "Heavy"){
      this.physicalActivityDesc = "Heavy manual labor such as construction work, digging, climbing, carrying a load uphill, professional sports; exercises 3-5 times per week for 1 1/2 hours per session.";
      this.physicalActivityValue = 45;
    }
    this.submit();
  }

  submit(){
    var cm: number;
    var height = Math.round(this.height);

    if(this.isAdult){
      if(((this.formGroup.valid) && (this.adultFormGroup.valid))&&(this.heightValid)){
        if(this.unitMeasureAbbrev == "cm"){
          this.desirableBodyWeightKg = ((height - 100)-((height - 100)*0.1));
          this.desirableBodyWeightLb = Math.round(this.desirableBodyWeightKg * 2.2);
          this.energyRqmt = this.desirableBodyWeightKg * this.physicalActivityValue;
        }
        else if(this.unitMeasureAbbrev == "ft"){
          cm = (height / 3.26) * 100;
          this.desirableBodyWeightKg = ((cm - 100)-((cm - 100)*0.1));
          this.desirableBodyWeightLb = Math.round(this.desirableBodyWeightKg * 2.2);
          this.energyRqmt = this.desirableBodyWeightKg * this.physicalActivityValue;
        }
        else if(this.unitMeasureAbbrev == "in"){
          cm = 2.54 * height;
          this.desirableBodyWeightKg = ((cm - 100)-((cm - 100)*0.1));
          this.desirableBodyWeightLb = Math.round(this.desirableBodyWeightKg * 2.2);
          this.energyRqmt = this.desirableBodyWeightKg * this.physicalActivityValue;
        }
        this.showOutput = true;
        console.log(this.energyRqmt);
      }
      else
      console.log(this.formGroup.status+" "+this.adultFormGroup.status+" "+this.heightValid);
    }
    else{
      if(this.formGroup.valid){
        if(this.gender == 'Male'){
          if(this.ageRange == '1-2'){
            this.energyRqmt = '1000 kcal';
          }
          else if(this.ageRange == '3-5'){
            this.energyRqmt = '1350 kcal';
          }
          else if(this.ageRange == '6-9'){
            this.energyRqmt = '1600 kcal';
          }
          else if(this.ageRange == '10-12'){
            this.energyRqmt = '2060 kcal';
          }
          else if(this.ageRange == '13-15'){
            this.energyRqmt = '2700 kcal';
          }
          else if(this.ageRange == '16-18'){
            this.energyRqmt = '3010 kcal';
          }
          this.showOutput = true;
      }//end of if male
      else if(this.gender == 'Female'){
          if(this.ageRange == '1-2'){
            this.energyRqmt = '920 kcal';
          }
          else if(this.ageRange == '3-5'){
            this.energyRqmt = '1260 kcal';
          }
          else if(this.ageRange == '6-9'){
            this.energyRqmt = '1470 kcal';
          }
          else if(this.ageRange == '10-12'){
            this.energyRqmt = '1980 kcal';
          }
          else if(this.ageRange == '13-15'){
            this.energyRqmt = '2170 kcal';
          }
          else if(this.ageRange == '16-18'){
            this.energyRqmt = '2280 kcal';
          }
        this.showOutput = true;
     }
    }
  }
}//end of submit

  isFormComplete(){

    if(this.ageRange == "19+"){
      if(this.formGroup.valid){
        if(this.gender == 'Male'){

        }
      }
    }
    else{
     if(this.gender == 'Male'){
       if(this.ageRange){
        if(this.ageRange == '1-2'){
          this.energyRqmt = '1000 kcal';
          this.showOutput = true;
        }
        else if(this.ageRange == '3-5'){
          this.energyRqmt = '1350 kcal';
          this.showOutput = true;
        }
        else if(this.ageRange == '6-9'){
          this.energyRqmt = '1600 kcal';
          this.showOutput = true;
        }
        else if(this.ageRange == '10-12'){
          this.energyRqmt = '2060 kcal';
          this.showOutput = true;
        }
        else if(this.ageRange == '13-15'){
          this.energyRqmt = '2700 kcal';
          this.showOutput = true;
        }
        else if(this.ageRange == '16-18'){
          this.energyRqmt = '3010 kcal';
          this.showOutput = true;
        }
       }//end of ageRange
     }//end of if male
     if(this.gender == 'Female'){
       if(this.ageRange){
        if(this.ageRange == '1-2'){
          this.energyRqmt = '920 kcal';
          this.showOutput = true;
        }
        else if(this.ageRange == '3-5'){
          this.energyRqmt = '1260 kcal';
          this.showOutput = true;
        }
        else if(this.ageRange == '6-9'){
          this.energyRqmt = '1470 kcal';
          this.showOutput = true;
        }
        else if(this.ageRange == '10-12'){
          this.energyRqmt = '1980 kcal';
          this.showOutput = true;
        }
        else if(this.ageRange == '13-15'){
          this.energyRqmt = '2170 kcal';
          this.showOutput = true;
        }
        else if(this.ageRange == '16-18'){
          this.energyRqmt = '2280 kcal';
          this.showOutput = true;
        }
       }//end of ageRange
     }//end of if male
    }//end of else not adult
  }//end of method
}//end of class
