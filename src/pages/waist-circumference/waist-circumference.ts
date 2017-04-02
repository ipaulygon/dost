import { validateDeepLinks } from '@ionic/app-scripts/dist/deep-linking/util';
import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-waist-circumference',
  templateUrl: 'waist-circumference.html'
})
export class WaistCircumferencePage {

  gender:any = "male";

  formGroup: FormGroup;

  minCircum: number = 51;
  maxCircum: number = 180;

  inputMinCircum: number;
  inputMaxCircum: number;

  unitMeasure: any = "centimeters";
  unitMeasureAbbrev: any = "cm";

  waistCircum: any = 51;

  riskIsLow = false;
  
  waistCircumValid = false;
  showOutput = false;

  constructor(public alertctrl:AlertController,public formBuilder:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.formGroup = formBuilder.group({
      gender: ['', Validators.compose([Validators.required])],
      waistCircum: ['', Validators.compose([Validators.required])]
    });
    this.formGroup.get('waistCircum').valueChanges
		.debounceTime(2000)
		.subscribe(data => this.waistCircumChanged());

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaistCircumferencePage');
  }

  genderChanged(){
    this.showOutput = false;
    this.waistCircumChanged();
  }

  waistCircumChanged(){
    this.showOutput = false;
    this.waistCircumValid = false;

    if(this.unitMeasure == "centimeters"){

      let alert = this.alertctrl.create({
            message: "Please enter a valid number greater than 51 cm but less than 180 cm or a number with atleast 2 decimal places.",
            buttons: 
            [{
                text: 'Ok',
                handler: data => {
                }
            }]
        });

      if(this.formGroup.get('waistCircum').valid){
        if((this.waistCircum >= 51) && (this.waistCircum <= 180)){
          if(this.gender == "male"){
            if(this.waistCircum < 94){
              this.riskIsLow = true;
            }
            else if(this.waistCircum >= 94){
              this.riskIsLow = false;
            }
          }
          else if(this.gender == "female"){
            if(this.waistCircum < 80){
              this.riskIsLow = true;
            }
            else if(this.waistCircum >= 80){
              this.riskIsLow = false;
            }
          }
          this.waistCircumValid = true;
        }
        else{
          alert.present();
        }
      }
      else{
        alert.present();
      }
    }
    else if(this.unitMeasure == "inches"){

      let alert = this.alertctrl.create({
            message: "Please enter a valid number greater than 20 inches but less than 71 inches or a number with atleast 2 decimal places.",
            buttons: 
            [{
                text: 'Ok',
                handler: data => {
                }
            }]
          });

      if(this.formGroup.get('waistCircum').valid){
        let cm = Math.round(this.waistCircum * 2.54);
        if((this.waistCircum >= 20) && (this.waistCircum <= 71)){
          if(this.gender == "male"){
            if(cm < 94){
              this.riskIsLow = true;
            }
            else if(cm >= 94){
              this.riskIsLow = false;
            }
          }
          else if(this.gender == "female"){
            if(cm < 80){
              this.riskIsLow = true;
            }
            else if(cm >= 80){
              this.riskIsLow = false;
            }
          }
          this.waistCircumValid = true;
        }
        else{
          alert.present();
        }
      }//end of if circum is valid
      else{
        alert.present();
      }
    }//end of inches
    this.submit();
  }

  unitChanged(){
    this.showOutput = false;
    if(this.unitMeasure == "centimeters"){
      this.minCircum = 51;
      this.maxCircum = 180;
      this.unitMeasureAbbrev = "cm";
      this.waistCircum = Math.round(this.waistCircum * 2.54);
      this.inputMinCircum = 2;
      this.inputMaxCircum = 6;
    }
    else{
      this.minCircum = 20;
      this.maxCircum = 71;
      this.unitMeasureAbbrev = "in";
      this.waistCircum = Math.round(this.waistCircum / 2.54);
      this.inputMinCircum = 2;
      this.inputMaxCircum = 5;
    }
    this.submit();
  }

  submit(){
    this.showOutput = false;
    if((this.formGroup.valid)&&(this.waistCircumValid)){
      this.showOutput = true;
    }
    console.log(this.formGroup.status+" "+this.waistCircumValid);
  }
}
