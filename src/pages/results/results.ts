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
  age: number;

  //bmi
  bmi: any;
  bmiStatus : any;
  bmiAbnormal : boolean = false;
  bmiNormal : boolean = false;

  //dbw
  dbw: any;
  dbwRange: any;
  dbwStatus: any;
  dbwNormal : boolean = false;

  //energy
  activity: any = 30;
  energy: any = 0;

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
    this.dbwResult();
    this.energyResult();
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

   closeModal(){
     this.navCtrl.pop();
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

  dbwResult(){
    //getAge && getMonth
    let weight = this.weight;
    let height = this.height;
    let age = this.getAge();
    let month = this.getMonth();
    let gender = this.gender;
    let p = Math.round(((height-100)*.1)*100)/100;
    console.log(p);
    let dbw = Math.round(((height-100)-(p))*100)/100;
    let dbwCut = dbw*0.1;
    let dbwMin = dbw-dbwCut;
    let dbwMax = dbw+dbwCut;
    if(age<10 && month>0){
      this.storage.get('wfa'+gender+age.toString()+month.toString()).then((val)=>{
        if(weight<=val[0]){
          this.dbwNormal = false; this.dbwStatus = "SEVERELY WASTED";
        }else if(weight>val[0] && weight<val[1]){
          this.dbwNormal = false; this.dbwStatus = "WASTED";
        }else if(dbw>=val[1] && dbw<=val[5]){
          this.dbwNormal = true; this.dbwStatus = "NORMAL";
        }else if(dbw>val[5] && dbw<val[6]){
          this.dbwNormal = false; this.dbwStatus = "OVERWEIGHT";
        }else if(dbw>=val[6]){
          this.dbwNormal = false; this.dbwStatus = "OBESE";
        }
        this.dbwRange = val[1]+" kg - "+val[5]+" kg";
      });
    }else if(age<=10 && month==0){
      this.storage.get('wfa'+gender+age.toString()).then((val)=>{
        if(weight<=val[0]){
          this.dbwNormal = false; this.dbwStatus = "SEVERELY WASTED";
        }else if(weight>val[0] && weight<val[1]){
          this.dbwNormal = false; this.dbwStatus = "WASTED";
        }else if(dbw>=val[1] && dbw<=val[5]){
          this.dbwNormal = true; this.dbwStatus = "NORMAL";
        }else if(dbw>val[5] && dbw<val[6]){
          this.dbwNormal = false; this.dbwStatus = "OVERWEIGHT";
        }else if(dbw>=val[6]){
          this.dbwNormal = false; this.dbwStatus = "OBESE";
        }
        this.dbwRange = val[1]+" kg - "+val[5]+" kg";
      });
    }else if(age>10 && age<19){
      this.dbwRange = "";
      this.dbwStatus = "UNDEFINED";
      this.dbwNormal = true;
    }else{
      this.dbw = "Your desirable body weight is " + dbw + " kg";
      this.dbwRange = dbwMin+" kg - "+dbwMax+" kg";
      if(dbw>=dbwMin && dbw<=dbwMax){
        this.dbwNormal = true;
        this.dbwStatus = "NORMAL";
      }else if(dbw<dbwMin){
        this.dbwNormal = false;
        this.dbwStatus = "UNDERWEIGHT";
      }else if(dbw>dbwMax){
        this.dbwNormal = false;
        this.dbwStatus = "OVERWEIGHT";
      }
    }
  }

  energyResult(){
    let weight = this.weight;
    let height = this.height;
    let age = this.getAge();
    this.age = this.getAge();
    let p = Math.round(((height-100)*.1)*100)/100;
    console.log(p);
    let dbw = Math.round(((height-100)-(p))*100)/100;
    if(age<=2){
      this.energy = (this.gender=="M") ? 1000 : 920;
    }else if(age>2 && age<=5){
      this.energy = (this.gender=="M") ? 1350: 1260;
    }else if(age>5 && age<=9){
      this.energy = (this.gender=="M") ? 1600: 147;
    }else if(age>9 && age<=12){
      this.energy = (this.gender=="M") ? 2060 : 1980;
    }else if(age>12 && age<=15){
      this.energy = (this.gender=="M") ? 2700 : 2170;
    }else if(age>15 && age<=18){
      this.energy = (this.gender=="M") ? 3010 : 2280;
    }else{
      let round = dbw*this.activity;
      console.log(round);
      if(round % 50 < 25){
        round -= (round % 50);
      }
      else if(round % 50 > 25){
        round += (50 - (round % 50));
      }
      else if(round % 50 == 25){
        round += 25;
      }
      this.energy = round;
    }
  }

  activityChange(){

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
