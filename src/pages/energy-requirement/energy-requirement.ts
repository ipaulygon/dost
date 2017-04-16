import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

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

  ft:number = 4;
  in:number = 0;

  energyRqmt: number;

  inchSelect = 'Inches';

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
  inputMinLengthInch=0;
  inputMaxLengthInch=2;

  inControl: FormControl;

  carbsPercentage: number = .65;
  proteinPercentage: number = .15;
  fatPercentage: number = .20;

  carbsPercentageDefault: number = .65;
  proteinPercentageDefault: number = .15;
  fatPercentageDefault: number = .20;

  /*newCarbsPercentage: number = .65;
  newProteinPercentage: number = .15;
  newFatPercentage: number = .20;*/

  carbsGrams: number;
  proteinGrams: number;
  fatGrams: number;

  minProtein: number;
  maxProtein: number;
  minCarbs: number;
  maxCarbs: number;
  minFat: number;
  maxFat: number;

  modifyDistribution = false;

  totalPercentage: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public formBuilder:FormBuilder, public toastCtrl:ToastController,
              public alertCtrl:AlertController) {
    this.formGroup = formBuilder.group({
      gender: ['', Validators.compose([Validators.required])],
      ageRange: ['', Validators.compose([Validators.required])]
    });

    this.adultFormGroup = formBuilder.group({
      height: ['',Validators.compose([Validators.required])],
      physicalActivity: ['',Validators.compose([Validators.required])],
      ft: ['']
   });

   	this.adultFormGroup.get('height').valueChanges
		.debounceTime(2000)
		.subscribe(data => this.heightChanged());

    this.adultFormGroup.get('ft').valueChanges
		.debounceTime(2000)
		.subscribe(data => this.heightChanged());

    this.inControl = new FormControl();
    this.inControl.valueChanges
    .debounceTime(2000)
    .subscribe(data => this.heightChanged());
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnergyRequirementPage');
  }

  genderChanged(){
    this.showOutput = false;
    this.ageRangeChanged();
  }

  ageRangeChanged(){
    this.showOutput = false;

    if(this.ageRange =="1-2"){
      this.minProtein = 6;
      this.maxProtein = 15;

      this.minFat = 20;
      this.maxFat = 35;
 
      this.minCarbs = 50;
      this.maxCarbs= 69;
    }
    else if(this.ageRange =="19+"){
      this.minProtein = 10;
      this.maxProtein = 15;

      this.minFat = 15;
      this.maxFat = 30;
 
      this.minCarbs = 55;
      this.maxCarbs = 75;
    }
    else{
      this.minProtein = 6;
      this.maxProtein = 15;

      this.minFat = 15;
      this.maxFat = 30;
 
      this.minCarbs = 55;
      this.maxCarbs = 79;
    }

    if(this.ageRange == "19+"){
      this.showOutput = false;
      this.isAdult = true;
    }
    else{
      this.isAdult = false;
    }

    this.carbsPercentage = this.carbsPercentageDefault;
    this.proteinPercentage = this.proteinPercentageDefault;
    this.fatPercentage = this.fatPercentageDefault;
    this.submit();
  }

  unitChanged(){
    
    this.showOutput = false;
    if(this.unitMeasure == 'Centimeters'){
      let inch = 0;
      this.heightMin = 122;
      this.heightMax = 243;
      this.unitMeasureAbbrev = 'cm';
      //this.height = parseFloat((this.height / 0.032808).toFixed(2));
      inch = this.ft * 12;
      let inc = parseInt((inch).toString()) + parseInt((this.in).toString())
      let cm =  inc * 2.54;
      cm = parseFloat((cm).toFixed(2));
      this.height = cm;
      console.log(inch + " " + cm + " " + this.height + " " + this.in+ " " + inc);
      this.inputMinLength = 3;
      this.inputMaxLength = 6;
    }
    else if(this.unitMeasure == 'Feet'){
      this.heightMin = 4;
      this.heightMax = 8;
      this.unitMeasureAbbrev = 'ft';
      let inc = this.height/2.54;
      let ft = parseInt((inc/12).toString());
      this.ft = ft;
      this.in = parseInt((inc % 12).toFixed(0));
      console.log(ft + " " + inc + " " + this.in);
      //let height = parseFloat((this.height *  0.032808).toFixed(2));
     // let upperLower = height.toString().split('.');
     // this.ft = parseFloat(upperLower[0]);
      //this.in = parseFloat(upperLower[1]);
      this.inputMinLength = 1;
      this.inputMaxLength = 1;
      this.inputMinLengthInch = 1;
      this.inputMaxLengthInch = 1;

      //console.log(height+" "+ upperLower+" "+upperLower[0]+" "+upperLower[1]);
    }
    this.heightChanged();
  }//end of unitChanged

  heightChanged(){
    var message:string;
    this.heightValid = false;
    this.showOutput = false;

    if(this.unitMeasure == "Centimeters"){
      if(this.adultFormGroup.get('height').valid){
        if((Number(this.height) > 121) && (Number(this.height) < 243.7)){
          this.heightValid = true;
        }
        else{
          this.heightValid = false;
        }
      }
      else{
        this.heightValid = false;
      }
      message = "Please enter a valid number greater than 121.9 cm but less than 243.8 cm or a number with atleast 2 decimal places.";
    }
    else if(this.unitMeasure == "Feet"){
      if(!(Number.isNaN(this.ft))){
          if((Number(this.ft) > 3) && (Number(this.ft) < 9)){
            if(this.in != 0){
              if((Number(this.in) > 0) && (Number(this.in) < 12)){
                this.heightValid = true;
              }
              else{
                this.heightValid = false;
                message = "Please enter a valid number greater than less than 12in.";
              }
            }
            else{
              this.heightValid = true;
            }
          }
          else{
            this.heightValid = false;
            message = "Please enter a valid number greater than 3ft but less than 9ft";
          }
        }
        else{
          this.heightValid = false;
          message = "Please enter a valid number greater than 3ft but less than 9ft";
        }
    }
/*
    if(this.adultFormGroup.get('height').valid){
      if(this.unitMeasure == "Centimeters"){
        if((Number(this.height) > 121) && (Number(this.height) < 243.7)){
          this.heightValid = true;
        }
        else{
          this.heightValid = false;
        }
      }
      else if(this.unitMeasure == "Feet"){
        if((this.adultFormGroup.get('ft').valid) && (Math.ceil((this.ft)) === this.ft)){
          if((Number(this.ft) > 3) && (Number(this.ft) < 9)){
            if(this.in != 0){
              if((Number(this.in) >= 0) && (Number(this.in) < 12)){
                this.heightValid = true;
              }
            }
            else{
              this.heightValid = true;
            }
          }
          else{
            this.heightValid = false;
          }
        }
        else{
          this.heightValid = false;
        }
      }
    }
    else{
      this.heightValid = false;
    }*/

    if(this.heightValid == false){
      let alert = this.alertCtrl.create({
      message: message,
      buttons: 
      [{
          text: 'Ok',
          handler: data => {
          }
        }]
    });
      alert.present();
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
    var cm: number, ftInch:number, dbwKg_raw:number;
    this.modifyDistribution = false;

    if(this.isAdult){
      if(((this.formGroup.valid) && (this.adultFormGroup.valid))&&(this.heightValid)){
        if(this.unitMeasureAbbrev == "cm"){
          dbwKg_raw = parseFloat(((this.height - 100)-((this.height - 100)*0.1)).toFixed(3));
          this.desirableBodyWeightKg = dbwKg_raw.toFixed(1);
          this.desirableBodyWeightLb = (dbwKg_raw * 2.2).toFixed(1);
          this.energyRqmt = dbwKg_raw * this.physicalActivityValue;
        }
        else if(this.unitMeasureAbbrev == "ft"){
          if(this.in != 0){
            let inch = this.ft * 12;
            let inc = parseInt((inch).toString()) + parseInt((this.in).toString())
            cm =  inc * 2.54;
            cm = parseFloat((cm).toFixed(2));
            //cm = parseFloat((ftInch /  0.032808).toFixed(3));
          }
          else{
            let inch = this.ft * 12;
            let inc = parseInt((inch).toString()) + parseInt((this.in).toString())
            cm =  inc * 2.54;
            cm = parseFloat((cm).toFixed(2));
            //cm = parseFloat((this.ft /  0.032808).toFixed(3));
          }
          dbwKg_raw = parseFloat(((cm - 100)-((cm - 100)*0.1)).toFixed(3));
          this.desirableBodyWeightKg = dbwKg_raw.toFixed(1);
          this.desirableBodyWeightLb = (dbwKg_raw * 2.2).toFixed(1);
          this.energyRqmt = dbwKg_raw * this.physicalActivityValue;
        }
        console.log(dbwKg_raw,this.energyRqmt);
        //this.energyRqmt = Math.floor(this.energyRqmt / 50.0) * 50.0;
        if(this.energyRqmt % 50 < 25){
          this.energyRqmt -= (this.energyRqmt % 50);
        }
        else if(this.energyRqmt % 50 > 25){
          this.energyRqmt += (50 - (this.energyRqmt % 50));
        }
        else if(this.energyRqmt % 50 == 25){
          this.energyRqmt += 25;
        }
        this.calculateDistribution();
        this.showOutput = true;
      }
      else
      console.log(this.formGroup.status+" "+this.adultFormGroup.status+" "+this.heightValid);
    }
    else{
      if(this.formGroup.valid){
        if(this.gender == 'Male'){
          if(this.ageRange == '1-2'){
            this.energyRqmt = 1000;
          }
          else if(this.ageRange == '3-5'){
            this.energyRqmt = 1350;
          }
          else if(this.ageRange == '6-9'){
            this.energyRqmt = 1600;
          }
          else if(this.ageRange == '10-12'){
            this.energyRqmt = 2060;
          }
          else if(this.ageRange == '13-15'){
            this.energyRqmt = 2700;
          }
          else if(this.ageRange == '16-18'){
            this.energyRqmt = 3010;
          }
          this.calculateDistribution();
          this.showOutput = true;
      }//end of if male
      else if(this.gender == 'Female'){
          if(this.ageRange == '1-2'){
            this.energyRqmt = 920;
          }
          else if(this.ageRange == '3-5'){
            this.energyRqmt = 1260;
          }
          else if(this.ageRange == '6-9'){
            this.energyRqmt = 1470;
          }
          else if(this.ageRange == '10-12'){
            this.energyRqmt = 1980;
          }
          else if(this.ageRange == '13-15'){
            this.energyRqmt = 2170;
          }
          else if(this.ageRange == '16-18'){
            this.energyRqmt = 2280;
          }
          this.calculateDistribution();
          this.showOutput = true;
      }
    }
  }
}//end of submit

  calculateDistribution(){
    var carbs:number, protein:number, fat:number;

    if(this.modifyDistribution){
      carbs = this.carbsPercentage / 100;
      protein = this.proteinPercentage / 100;
      fat = this.fatPercentage / 100;
    }
    else{
      carbs = this.carbsPercentage;
      this.carbsPercentage *= 100;

      protein = this.proteinPercentage;
      this.proteinPercentage *= 100;

      fat = this.fatPercentage;
      this.fatPercentage *= 100;
    }
      let carbsGrams = (this.energyRqmt * carbs) / 4;
      this.carbsGrams = Math.round( carbsGrams / 5 ) * 5;

      let proteinGrams = (this.energyRqmt * protein) / 4;
      this.proteinGrams = Math.round( proteinGrams / 5 ) * 5;

      let fatGrams = (this.energyRqmt * fat) / 9;
      this.fatGrams = Math.round( fatGrams / 5 ) * 5;

      this.totalPercentage = this.carbsPercentage + this.proteinPercentage + this.fatPercentage;
  }

  modifyDistributionClicked(){
    this.modifyDistribution = true;
  }

  resetClicked(){
    this.carbsPercentage = this.carbsPercentageDefault;
    this.proteinPercentage = this.proteinPercentageDefault;
    this.fatPercentage = this.fatPercentageDefault;
    this.modifyDistribution = false;
    this.calculateDistribution();

  }

  okClicked(){  
    if(this.totalPercentage == 100){
      this.modifyDistribution = false;
      let toast = this.toastCtrl.create({
        message: 'Changes saved',
        duration: 3000,
        position: 'top',
        showCloseButton: true
      });
      toast.present();
    }
    else{
      let toast = this.toastCtrl.create({
        message: 'Percentage does not equal to 100!',
        duration: 3000,
        position: 'top',
        showCloseButton: true
      });
      toast.present();
    }
  }
}//end of class