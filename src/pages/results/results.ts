import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  
  macroForm: FormGroup;
  energyForm: FormGroup;
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
  macroRange: boolean = false;
  minProtein: number = 6;
  maxProtein: number = 15;
  minFat: number = 25;
  maxFat: number = 35;
  minCarb: number = 50;
  maxCarb: number = 69;
  protein: number = 15;
  fat: number = 30;
  carb: number = 55;
  proteinReset: number;
  fatReset: number;
  carbReset: number;
  proteinG: number;
  fatG: number;
  carbG: number;
  macroPercent: number = 100;
  energyCard: boolean = false;
  energySee : boolean = false;
  kcal: number;
  activity: number = 30;
  activityLevel: any = "";
  //waistCir
  waistCircOnRisk: boolean = false;
  waistCirCard: boolean = false;
  waistCirMessage: any;
  waistCirSee : boolean = false;

  //waist-Hip
  whRatio: number = 0.0;
  whOnRisk: boolean = false;
  whCard: boolean = false;
  whMessage: any;
  whSee : boolean = false;

  //waist-height
  whgtRatio: number = 0.0;
  whgtOnRisk: boolean = false;
  whgtCard: boolean = false;
  whgtMessage: any = "Height";
  whgtSee : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public formBuilder:FormBuilder) {
    this.gender = this.navParams.get("gender");
    this.birthday = this.navParams.get("birthday");
    this.weight = this.navParams.get("weight");
    this.height = this.navParams.get("height");
    this.waist = this.navParams.get("waist");
    this.hip = this.navParams.get("hip");
    this.age = this.getAge();
    this.energyForm = formBuilder.group({
      pregnant: [false],
      lactating: [false],
    });
    this.macroForm = formBuilder.group({
      proteinRange: [this.protein],
      fatRange: [this.fat],
      carbRange: [this.carb],
    });
    if(this.height!=0){
      if(this.waist!=0){
        this.whgtCard = true;
      }else{
        this.whgtCard = false;
      }
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
    }
    if(this.waist!=0){
      this.waistCirCard = true;
      if(this.hip!=0){
        this.whCard = true;
      }else{
        this.whCard = false;
      }
    }else{
      this.waistCirCard = false;
    }
    this.bmiResult();
    this.dbwResult();
    this.energyResult();
    this.waistCircumResult();
    this.waistHipResult();
    this.waistHeightResult();
    this.macroForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.computePercent());
    this.energyForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.energyResult());
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

  macro(){
    if(!this.macroRange){
      this.proteinReset = this.protein;
      this.fatReset = this.fat;
      this.carbReset = this.carb;
    }
    this.macroRange = (this.macroRange) ? false : true;
  }

  reset(){
    this.macroForm.controls['proteinRange'].setValue(this.proteinReset);
    this.macroForm.controls['fatRange'].setValue(this.fatReset);
    this.macroForm.controls['carbRange'].setValue(this.carbReset);
    this.protein = this.proteinReset;
    this.fat = this.fatReset;
    this.carb = this.carbReset;
    this.computePercent();
  }

  computePercent(){
    this.macroPercent = this.protein + this.fat + this.carb;
  }

  proteinChange(){
    this.protein = this.macroForm.value.proteinRange;
    let proteinG = (this.kcal*(this.protein/100))/4;
    this.proteinG = Math.round(proteinG/5)*5;
  }

  fatChange(){
    this.fat = this.macroForm.value.fatRange;
    let fatG = (this.kcal*(this.fat/100))/9;
    this.fatG = Math.round(fatG/5)*5;
  }

  carbChange(){
    this.carb = this.macroForm.value.carbRange;
    let carbG = (this.kcal*(this.carb/100))/4;
    this.carbG = Math.round(carbG/5)*5;
  }

  energyResult(){
    if(this.activity==30){
      this.activityLevel = "Driving, computer work, ironing, cooking; sits and stands most of the day; rarely gets any physical activity during the whole day.";
    }else if(this.activity==35){
      this.activityLevel = "Child care, garage work, electrical trades exercises or walks 3-5 times per week at a slow pace of 2.5 - 3 mph for less than 30 minutes per session.";
    }else if(this.activity==40){
      this.activityLevel = "Heavy housework, yard work, carrying a load, cycling, tennis, dancing; exercises or walks 3.5 - 4 mph for one hour 3-5 times per week.";
    }else if(this.activity==45){
      this.activityLevel = "Heavy manual labor such as construction work, digging, climbing, carrying a load uphill, professional sports; exercises 3-5 times per week for 1 1/2 hours per session.";
    }
    if(this.age>=1 && this.age<=2){
      this.kcal = (this.gender=='M') ? 1000 : 920;
      this.minProtein = 6; this.maxProtein = 15;
      this.minFat = 25; this.maxFat = 35;
      this.minCarb = 50; this.maxCarb = 69;
      this.protein = 15; this.fat = 30; this.carb = 55;
    }else if(this.age>=3 && this.age<=5){
      this.kcal = (this.gender=='M') ? 1350 : 1260;
      this.minProtein = 6; this.maxProtein = 15;
      this.minFat = 15; this.maxFat = 30;
      this.minCarb = 55; this.maxCarb = 79;
      this.protein = 15; this.fat = 20; this.carb = 65;
    }else if(this.age>=6 && this.age<=9){
      this.kcal = (this.gender=='M') ? 1600 : 1470;
      this.minProtein = 6; this.maxProtein = 15;
      this.minFat = 15; this.maxFat = 30;
      this.minCarb = 55; this.maxCarb = 79;
      this.protein = 15; this.fat = 20; this.carb = 65;
    }else if(this.age>=10 && this.age<=12){
      this.kcal = (this.gender=='M') ? 2060 : 1980;
      this.minProtein = 6; this.maxProtein = 15;
      this.minFat = 15; this.maxFat = 30;
      this.minCarb = 55; this.maxCarb = 79;
      this.protein = 15; this.fat = 20; this.carb = 65;
    }else if(this.age>=13 && this.age<=15){
      this.kcal = (this.gender=='M') ? 2700 : 2170;
      this.minProtein = 6; this.maxProtein = 15;
      this.minFat = 15; this.maxFat = 30;
      this.minCarb = 55; this.maxCarb = 79;
      this.protein = 15; this.fat = 20; this.carb = 65;
    }else if(this.age>=16 && this.age<=18){
      this.kcal = (this.gender=='M') ? 3010 : 2280;
      this.minProtein = 6; this.maxProtein = 15;
      this.minFat = 15; this.maxFat = 30;
      this.minCarb = 55; this.maxCarb = 79;
      this.protein = 15; this.fat = 20; this.carb = 65;
    }else{
      this.minProtein = 10; this.maxProtein = 15;
      this.minFat = 15; this.maxFat = 30;
      this.minCarb = 55; this.maxCarb = 75;
      this.protein = 15; this.fat = 20; this.carb = 65;
      let activity = this.activity;
      let p = Math.round(((this.height-100)*.1)*100)/100;
      let dbw = parseInt((Math.round(((this.height-100)-(p))*100)/100).toFixed(2));
      let kcal = dbw*activity;
      if(kcal % 50 < 25){
        kcal -= (kcal % 50);
      }
      else if(kcal % 50 > 25){
        kcal += (50 - (kcal % 50));
      }
      else if(kcal % 50 == 25){
        kcal += 25;
      }
      this.kcal = kcal;
      if(this.gender=='F'){
        this.kcal = (this.energyForm.value.pregnant) ? this.kcal+300 : this.kcal;
        this.kcal = (this.energyForm.value.lactating) ? this.kcal+500 : this.kcal;
      }
    }
    // this.proteinG = Math.round(((this.kcal*(this.protein/100))/4)*100)/100;
    // this.fatG = Math.round(((this.kcal*(this.fat/100))/9)*100)/100;
    // this.carbG = Math.round(((this.kcal*(this.carb/100))/4)*100)/100;
    this.macroForm.controls['proteinRange'].setValue(this.protein);
    this.macroForm.controls['fatRange'].setValue(this.fat);
    this.macroForm.controls['carbRange'].setValue(this.carb);
    let proteinG = (this.kcal*(this.protein/100))/4;
    let fatG = (this.kcal*(this.fat/100))/9;
    let carbG = (this.kcal*(this.carb/100))/4;
    this.proteinG = Math.round(proteinG/5)*5;
    this.fatG = Math.round(fatG/5)*5;
    this.carbG = Math.round(carbG/5)*5;
  }

  bmiResult(){
    //getAge && getMonth
    let weight = this.weight;
    let height = Math.round((this.height/100)*100)/100;
    let age = this.getAge();
    let month = this.getMonth();
    let gender = this.gender;
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
