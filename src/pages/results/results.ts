import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
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
  
  gender: string;
  birthday: string;
  weight: number;
  height: number;
  waist: number;
  hip: number;

  //bmi
  bmi: any;
  bmiStatus : any;
  bmiAbnormal : boolean = false;
  bmiNormal : boolean = false;

  //
  waistCircOnRisk: boolean = false;

  //
  whRatio: number = 0.0;
  whOnRisk: boolean = false;

  //
  whgtRatio: number = 0.0;
  whgtOnRisk: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,) {
    this.gender = this.navParams.get("gender");
    this.birthday = this.navParams.get("birthday");
    this.weight = this.navParams.get("weight");
    this.height = this.navParams.get("height");
    this.waist = this.navParams.get("waist");
    this.hip = this.navParams.get("hip");

    this.bmiResult();
    this.waistCircumResult();
    this.waistHipResult();
    this.waistHeightResult();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
    console.log("gender: " + this.gender);
    console.log("birthday: " + this.birthday);
    console.log("weight: " + this.weight);
    console.log("height: " + this.height);
    console.log("waist: " + this.waist);
    console.log("hip: " + this.hip);
   }

  bmiResult(){
      //getAge && getMonth
      let weight = this.weight;
      let height = Math.round((this.height/100)*100)/100;
      let age = this.getAge();
      let month = this.getMonth();
      let gender = this.gender;

      console.log("bmi-weight: " + weight);
      console.log("bmi-height: " + height);
      console.log("bmi-age: " + age);
      console.log("bmi-month: " + month);
      console.log("bmi-gender: " + gender);
      //start BMI
      let bmi = Math.round((weight/(height*height))*100)/100;
      this.bmi = bmi;
      //this.bmiMessage = "Your BMI is " + bmi + "kg/m²";
      if(age<=18 && month>0){
        this.storage.get('bmi'+gender+age.toString()+month.toString()).then((val)=>{
          if(bmi<val[0]){
            this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "SEVERE THINNESS";
          }else if(bmi>=val[0] && bmi<val[1]){
            this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "UNDERWEIGHT";
          }else if(bmi>=val[1] && bmi<val[5]){
            this.bmiAbnormal = false; this.bmiNormal = true; this.bmiStatus = "NORMAL";
          }else if(bmi>=val[5] && bmi<val[6]){
            this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "OVERWEIGHT";
          }else if(bmi>=val[6]){
            this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "OBESE";
          }
        });
      }else if(age<=19 && month==0){
        this.storage.get('bmi'+gender+age.toString()).then((val)=>{
          if(bmi<val[0]){
            this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "SEVERE THINNESS";
          }else if(bmi>=val[0] && bmi<val[1]){
            this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "UNDERWEIGHT";
          }else if(bmi>=val[1] && bmi<val[5]){
            this.bmiAbnormal = false; this.bmiNormal = true; this.bmiStatus = "NORMAL";
          }else if(bmi>=val[5] && bmi<val[6]){
            this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "OVERWEIGHT";
          }else if(bmi>=val[6]){
            this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "OBESE";
          }
        });
      }else{
        if(bmi<18.5){
          this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "UNDERWEIGHT";
        }else if(bmi>=18.5 && bmi<25){
          this.bmiAbnormal = false; this.bmiNormal = true; this.bmiStatus = "NORMAL";
        }else if(bmi>=25 && bmi<30){
          this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "OVERWEIGHT";
        }else if(bmi>=30){
          this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "OBESE";
        }
      }
  }

  getAge(){
    let today = new Date();
    let birthDate = new Date(this.birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
  }

  getMonth(){
    let today = new Date();
    let birthDate = new Date(this.birthday);
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 && today.getDate() > birthDate.getDate()){
      m = 12-(Math.abs(m));
    }else if(m < 0 && today.getDate() < birthDate.getDate()){
      m = 11-(Math.abs(m));
    }else if(m > 0 && today.getDate() > birthDate.getDate()){
      m = m;
    }else if(m > 0 && today.getDate() < birthDate.getDate()){
      m = m-1;
    }else if(m === 0 && today.getDate() < birthDate.getDate()){
      m = 11;
    }else{
      m = 0;
    }
    return m;
  }

  waistCircumResult()
  {
    if(this.gender == "M"){
      if(this.waist < 94){
        this.waistCircOnRisk = false;
      }
      else if(this.waist >= 94){
        this.waistCircOnRisk = true;
      }
    }
    else if(this.gender == "F"){
      if(this.waist < 80){
        this.waistCircOnRisk = false;
      }
      else if(this.waist >= 80){
        this.waistCircOnRisk = true;
      }
    }
  }

  waistHipResult()
  {
    let waist = this.waist;
    let hip = this.hip;


    this.whRatio = Math.round((waist/hip)*100)/100;

    if((this.whRatio >= 0.90) && (this.gender == 'M')){
      this.whOnRisk = true;
    }else if((this.whRatio >= 0.85) && (this.gender == 'F')){
      this.whOnRisk = true;
    }else{
      this.whOnRisk = false;
    }
  }

  waistHeightResult()
  {
    let waist = this.waist;
    let height = this.height;


    this.whgtRatio = Math.round((waist/height)*100)/100;

    if(this.whgtRatio <= 0.50){
       this.whgtOnRisk = false;
     }else{
       this.whgtOnRisk = true;
     }
  }
}
