import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ToastController } from 'ionic-angular';

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
  bmiCard : boolean = false;
  bmiMessage: any = "Birthdate, Weight and Height";
  bmiSee : boolean = false;

  //dbw
  dbw: any;
  dbwRange: any;
  dbwStatus: any;
  dbwNormal : boolean = false;
  dbwCard : boolean = false;
  dbwMessage: any = "Birthdate, Weight and Height";
  dbwSee : boolean = false;

  //energy
  activity: any = 30;
  energy: any = 0;
  energyCard : boolean = false;
  energyMessage: any;
  energySee : boolean = false;
  modifyDistribution : boolean = false;
  minCarbs : number = 0.0;
  maxCarbs : number = 0.0;
  minProtein : number = 0.0;
  maxProtein : number = 0.0;
  minFat : number = 0.0;
  maxFat : number = 0.0;

  carbsPercentage : number = 65;
  proteinPercentage : number = 15;
  fatPercentage : number = 20;

  carbsGrams : number = 0.0;
  proteinGrams : number = 0.0;
  fatGrams : number = 0.0;

  totalPercentage : number = 0.0;

  //
  waistCircOnRisk: boolean = false;
  waistCirCard: boolean = true;
  waistCirMessage: any;
  waistCirSee : boolean = false;

  //
  whRatio: number = 0.0;
  whOnRisk: boolean = false;
  whCard: boolean = true;
  whMessage: any;
  whSee : boolean = false;

  //
  whgtRatio: number = 0.0;
  whgtOnRisk: boolean = false;
  whgtCard: boolean = false;
  whgtMessage: any = "Height";
  whgtSee : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public toastCtrl: ToastController) {
    this.gender = this.navParams.get("gender");
    this.birthday = this.navParams.get("birthday");
    this.weight = this.navParams.get("weight");
    this.height = this.navParams.get("height");
    this.waist = this.navParams.get("waist");
    this.hip = this.navParams.get("hip");

    if(this.height!=0){
      this.whgtCard = true;
      if(this.birthday!=''){
        this.energyCard = true;
        if(this.weight!=0){
          this.bmiCard = true;
          this.dbwCard = true;
        }else{
          this.bmiCard = false;
          this.dbwCard = false;
        }
      }else{
        this.energyCard = false;
      }
    }else{
      this.whgtCard = false;
    }

    this.carbsPercentage = 0.65;
    this.proteinPercentage = 0.15;
    this.fatPercentage = 0.20;

    this.bmiResult();
    this.dbwResult();
    this.energyResult();
    this.waistCircumResult();
    this.waistHipResult();
    this.waistHeightResult();

    //this.calculateDistribution();
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

  seeBmi(){
    if(this.bmiCard && !this.bmiSee){
      this.bmiSee = true;
    }else if(this.bmiCard && this.bmiSee){
      this.bmiSee = false;
    }
  }

  seeDbw(){
    if(this.dbwCard && !this.dbwSee){
      this.dbwSee = true;
    }else if(this.dbwCard && this.dbwSee){
      this.dbwSee = false;
    }
  }

  seeEnergy(){
    if(this.energyCard && !this.energySee){
      this.energySee = true;
    }else if(this.energyCard && this.energySee){
      this.energySee = false;
    }
  }

  modifyDistributionClicked(){
    this.modifyDistribution = true;
    this.energySee = true;

    let age = this.getAge();

    if(age == 1 || age == 2){
      this.minProtein = 6;
      this.maxProtein = 15;

      this.minFat = 20;
      this.maxFat = 35;
 
      this.minCarbs = 50;
      this.maxCarbs= 69;
    }else if(age >= 19){
      this.minProtein = 10;
      this.maxProtein = 15;

      this.minFat = 15;
      this.maxFat = 30;
 
      this.minCarbs = 55;
      this.maxCarbs = 75;
    }else{
      this.minProtein = 6;
      this.maxProtein = 15;

      this.minFat = 15;
      this.maxFat = 30;
 
      this.minCarbs = 55;
      this.maxCarbs = 79;
    }
  }

  resetClicked(){
    this.energySee = true;
    this.carbsPercentage = 0.65;
    this.proteinPercentage = 0.15;
    this.fatPercentage = 0.20;
    this.modifyDistribution = false;
    this.calculateDistribution();
  }

  okClicked(){
    this.energySee = true; 
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
      let carbsGrams = (this.energy * carbs) / 4;
      this.carbsGrams = Math.round( carbsGrams / 5 ) * 5;

      let proteinGrams = (this.energy * protein) / 4;
      this.proteinGrams = Math.round( proteinGrams / 5 ) * 5;

      let fatGrams = (this.energy * fat) / 9;
      this.fatGrams = Math.round( fatGrams / 5 ) * 5;

      this.totalPercentage = this.carbsPercentage + this.proteinPercentage + this.fatPercentage;
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
    this.age = this.getAge();
    let age = this.getAge();
    let month = this.getMonth();
    let gender = this.gender;
    let p = Math.round(((height-100)*.1)*100)/100;
    let dbw = parseInt((Math.round(((height-100)-(p))*100)/100).toFixed(2));
    let dbwCut = dbw*0.1;
    let dbwMin = dbw-dbwCut;
    let dbwMax = dbw+dbwCut;
    if(age<10 && month>0){
      this.storage.get('wfa'+gender+age.toString()+month.toString()).then((val)=>{
        if(weight<=val[0]){
          this.dbwNormal = false; this.dbwStatus = "SEVERELY WASTED";
        }else if(weight>val[0] && weight<val[1]){
          this.dbwNormal = false; this.dbwStatus = "WASTED";
        }else if(weight>=val[1] && weight<=val[5]){
          this.dbwNormal = true; this.dbwStatus = "NORMAL";
        }else if(weight>val[5] && weight<val[6]){
          this.dbwNormal = false; this.dbwStatus = "OVERWEIGHT";
        }else if(weight>=val[6]){
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
        }else if(weight>=val[1] && weight<=val[5]){
          this.dbwNormal = true; this.dbwStatus = "NORMAL";
        }else if(weight>val[5] && weight<val[6]){
          this.dbwNormal = false; this.dbwStatus = "OVERWEIGHT";
        }else if(weight>=val[6]){
          this.dbwNormal = false; this.dbwStatus = "OBESE";
        }
        this.dbwRange = val[1]+" kg - "+val[5]+" kg";
      });
    }else if(age>=10 && age<19){
      this.dbwRange = "";
      this.dbwStatus = "UNDEFINED";
      this.dbwNormal = true;
    }else{
      this.dbw = "Your desirable body weight is " + dbw + " kg";
      this.dbwRange = dbwMin+" kg - "+dbwMax+" kg";
      if(weight>=dbwMin && weight<=dbwMax){
        this.dbwNormal = true;
        this.dbwStatus = "NORMAL";
      }else if(weight<dbwMin){
        this.dbwNormal = false;
        this.dbwStatus = "UNDERWEIGHT";
      }else if(weight>dbwMax){
        this.dbwNormal = false;
        this.dbwStatus = "OVERWEIGHT";
      }
    }
  }

  energyResult(){
    this.carbsPercentage = .65;
    this.proteinPercentage = .15;
    this.fatPercentage = .20;
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
    this.calculateDistribution();
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
