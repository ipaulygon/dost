import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ResultsPage } from '../results/results';
/*
  Generated class for the UserProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {
	userProfileForm: FormGroup;
	weightKg: boolean = true;
	weightLb: boolean;
	cm: boolean = true;
	ft: boolean;
	waistCm: boolean = true;
	waistIn: boolean;
	hipCm: boolean = true;
	hipIn: boolean;
  bmiCard: any = "Please complete birthdate, height & weight";
  dbwCard: any = "Please complete birthdate & height";
  energyCard: any = "Please complete birthdate & height";
  waistCirCard: any = "Please complete waist circumference";
  waistHipCard: any = "Please complete waist circumference & hip circumference";
  waistHeightCard: any = "Please complete height & waist circumference";
  bmiMessage: string;
  bmiAbnormal: boolean;
  bmiNormal: boolean;
  bmiStatus: string;
  waistHeightRatio;
  waistHeightStatus: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public formBuilder: FormBuilder, 
              public storage: Storage,
              public modalCtrl: ModalController,) {
  	this.userProfileForm = formBuilder.group({
  		  gender: ['M', Validators.compose([Validators.required])],
        birth: ['', Validators.compose([Validators.required])],
        weight: ['kg', Validators.compose([Validators.required])],
        noWeight: ['0', Validators.compose([Validators.pattern('[0-9.]*'),Validators.required])],
        kiloRange: [''],
        poundRange: [''],
        height: ['cm', Validators.compose([Validators.required])],
        heightIn: ['in', Validators.compose([Validators.required])],
        noHeight: ['0', Validators.compose([Validators.pattern('[0-9.]*'),Validators.required])],
        noHeightFt: ['0', Validators.compose([Validators.pattern('[0-9]*'),Validators.required])],
        noHeightIn: ['0', Validators.compose([Validators.pattern('[0-9.]*'),Validators.required])],
        cmRange: [''],
        ftRange: [''],
        waist: ['cm', Validators.compose([Validators.required])],
        noWaist: ['51', Validators.compose([Validators.required])],
        hip: ['cm', Validators.compose([Validators.required])],
        noHip: ['51', Validators.compose([Validators.required])],
        cmWaistRange: [''],
        inWaistRange: [''],
        cmHipRange: [''],
        inHipRange: [''], 
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

  //pass user profile details to result
  result(){
    let results = {
      gender: this.userProfileForm.value.gender,
      birthday: this.userProfileForm.value.birth,
      weight: (this.weightKg) ? this.userProfileForm.value.noWeight : this.convertToKg(this.userProfileForm.value.noWeight),
      height: (this.cm) ? this.userProfileForm.value.noHeight : this.ft2cm(this.userProfileForm.value.noHeight, this.userProfileForm.value.noHeightIn),
      waist: (this.waistCm) ? this.userProfileForm.value.noWaist : this.convertToCm(this.userProfileForm.value.noWaist),
      hip: (this.hipCm) ? this.userProfileForm.value.noHip : this.convertToCm(this.userProfileForm.value.noHip),
    }
    console.log(results);
    let modal = this.modalCtrl.create(ResultsPage,results);
    modal.present();
  }

  // result(){
  //   if(this.userProfileForm.value.birth!=null || this.userProfileForm.value.birth!=''){
  //     this.bmiResult();
  //     this.waistHeightResult();
  //     this.bmiCard = true;
  //     this.waistHeightCard = true;
  //   }
  //   let results = {
  //     bmiCard : this.bmiCard,
  //     dbwCard : this.dbwCard,
  //     energyCard : this.energyCard,
  //     waistCirCard : this.waistCirCard,
  //     waistHipCard : this.waistHipCard,
  //     waistHeightCard : this.waistHeightCard,
  //     bmiMessage: this.bmiMessage,
  //     bmiAbnormal: this.bmiAbnormal,
  //     bmiNormal: this.bmiNormal,
  //     bmiStatus: this.bmiStatus,
  //     waistHeightRatio: this.waistHeightRatio,
  //     waistHeightStatus: this.waistHeightStatus,
  //   }
  //   let modal = this.modalCtrl.create(ResultsPage,results);
  //   modal.present();
  // }

  // bmiResult(){
  //   if(this.userProfileForm.value.noWeight!=0 || this.userProfileForm.value.noHeight!=0 || this.userProfileForm.value.noHeightIn!=0){
  //     let weight = 0;
  //     let height = 0;
  //     if(!this.weightKg){
  //       weight = Math.round((this.userProfileForm.value.noWeight/2.2)*100)/100;
  //     }else{
  //       weight = this.userProfileForm.value.noWeight;
  //     }
  //     //end of weight
  //     if(this.cm){
  //       height = Math.round((this.userProfileForm.value.noHeight/100)*100)/100;
  //     }else{
  //       let feet = this.userProfileForm.value.noHeight*12;
  //       let inch = this.userProfileForm.value.noHeightIn;
  //       if(inch=='' || inch==null){
  //         inch = 0;
  //       }
  //       let toInch = eval(feet+"+"+inch);
  //       let cm = Math.round((toInch*2.54)*100)/100;
  //       height = Math.round((cm/100)*100)/100;
  //     }//end of height
  //     //getAge && getMonth
  //     let age = this.getAge();
  //     let month = this.getMonth();
  //     let gender = this.userProfileForm.value.gender;
  //     //start BMI
  //     let bmi = Math.round((weight/(height*height))*100)/100;
  //     this.bmiMessage = "Your BMI is " + bmi + "kg/m²";
  //     if(age<=18 && month>0){
  //       this.storage.get('bmi'+gender+age.toString()+month.toString()).then((val)=>{
  //         if(bmi<val[0]){
  //           this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "SEVERE THINNESS";
  //         }else if(bmi>=val[0] && bmi<val[1]){
  //           this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "UNDERWEIGHT";
  //         }else if(bmi>=val[1] && bmi<val[5]){
  //           this.bmiAbnormal = false; this.bmiNormal = true; this.bmiStatus = "NORMAL";
  //         }else if(bmi>=val[5] && bmi<val[6]){
  //           this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "OVERWEIGHT";
  //         }else if(bmi>=val[6]){
  //           this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "OBESE";
  //         }
  //       });
  //     }else if(age<=19 && month==0){
  //       this.storage.get('bmi'+gender+age.toString()).then((val)=>{
  //         if(bmi<val[0]){
  //           this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "SEVERE THINNESS";
  //         }else if(bmi>=val[0] && bmi<val[1]){
  //           this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "UNDERWEIGHT";
  //         }else if(bmi>=val[1] && bmi<val[5]){
  //           this.bmiAbnormal = false; this.bmiNormal = true; this.bmiStatus = "NORMAL";
  //         }else if(bmi>=val[5] && bmi<val[6]){
  //           this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "OVERWEIGHT";
  //         }else if(bmi>=val[6]){
  //           this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "OBESE";
  //         }
  //       });
  //     }else{
  //       if(bmi<18.5){
  //         this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "UNDERWEIGHT";
  //       }else if(bmi>=18.5 && bmi<25){
  //         this.bmiAbnormal = false; this.bmiNormal = true; this.bmiStatus = "NORMAL";
  //       }else if(bmi>=25 && bmi<30){
  //         this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "OVERWEIGHT";
  //       }else if(bmi>=30){
  //         this.bmiAbnormal = true; this.bmiNormal = false; this.bmiStatus = "OBESE";
  //       }
  //     }
  //   }
  // }

  // waistHeightResult(){
  //   let feet = this.userProfileForm.value.noHeight*12;
  //   let inch = this.userProfileForm.value.noHeightIn;

  //   let waist = (this.userProfileForm.value.waist == 'cm') ? this.userProfileForm.value.noWaist : this.convertToCm(this.userProfileForm.value.noWaist);
  //   let height = (this.userProfileForm.value.height == 'cm') ? this.userProfileForm.value.noHeight : this.convertToCm(eval(feet+"+"+inch));

  //   this.waistHeightRatio = Math.round(eval(waist + '/' + height)*100)/100;

  //    if(this.waistHeightRatio <= 0.50){
  //      this.waistHeightStatus = false;
  //    }else{
  //      this.waistHeightStatus = true;
  //    }
  // }

  // getAge(){
  //   let today = new Date();
  //   let birthDate = new Date(this.userProfileForm.value.birth);
  //   let age = today.getFullYear() - birthDate.getFullYear();
  //   let m = today.getMonth() - birthDate.getMonth();
  //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
  //   {
  //       age--;
  //   }
  //   return age;
  // }

  // getMonth(){
  //   let today = new Date();
  //   let birthDate = new Date(this.userProfileForm.value.birth);
  //   let m = today.getMonth() - birthDate.getMonth();
  //   if (m < 0 && today.getDate() > birthDate.getDate()){
  //     m = 12-(Math.abs(m));
  //   }else if(m < 0 && today.getDate() < birthDate.getDate()){
  //     m = 11-(Math.abs(m));
  //   }else if(m > 0 && today.getDate() > birthDate.getDate()){
  //     m = m;
  //   }else if(m > 0 && today.getDate() < birthDate.getDate()){
  //     m = m-1;
  //   }else if(m === 0 && today.getDate() < birthDate.getDate()){
  //     m = 11;
  //   }else{
  //     m = 0;
  //   }
  //   return m;
  // }

  convertToInch(val)
  {
    return Math.round(eval(val+'/'+2.54)*100)/100;
  }

  convertToCm(val)
  {
    return Math.round(eval(val+'*'+2.54)*100)/100;
  }

  convertToKg(val)
  {
  	return Math.round((val/2.2)*10)/10;
  }

  convertToLb(val)
  {
  	return Math.round((val*2.2)*10)/10;
  }

  ft2cm(ft, inch)
  {
    let feet = ft*12;
    if(inch=='' || inch==null){
      inch = 0;
    }
    let toInch = eval(feet+"+"+inch);
    return Math.round((toInch*2.54)*100)/100;
  }

  cmWaistChange(){
    this.userProfileForm.controls['noWaist'].setValue(this.userProfileForm.value.cmWaistRange);
  }

  inWaistChange(){
    this.userProfileForm.controls['noWaist'].setValue(this.userProfileForm.value.inWaistRange);
  }

  cmHipChange(){
    this.userProfileForm.controls['noHip'].setValue(this.userProfileForm.value.cmHipRange);
  }

  inHipChange(){
    this.userProfileForm.controls['noHip'].setValue(this.userProfileForm.value.inHipRange);
  }

  setWaistRange(){
    if(this.userProfileForm.value.waist=="cm"){
      this.userProfileForm.controls['cmWaistRange'].setValue(this.userProfileForm.value.noWaist);
    }else{
      this.userProfileForm.controls['inWaistRange'].setValue(this.userProfileForm.value.noWaist);
    }
  }

  setHipRange(){
    if(this.userProfileForm.value.hip=="cm"){
      this.userProfileForm.controls['cmHipRange'].setValue(this.userProfileForm.value.noHip);
    }else{
      this.userProfileForm.controls['inHipRange'].setValue(this.userProfileForm.value.noHip);
    }
  }

  waistUnitChange(){
    if(this.userProfileForm.value.waist=="cm"){
      if(!this.waistCm){
        this.waistCm = true;
        this.waistIn = false;
        // this.userProfileForm.controls['hip'].setValue('cm');
        let inConv = this.convertToCm(this.userProfileForm.value.noWaist);
        this.userProfileForm.controls['noWaist'].setValue(inConv);
        this.userProfileForm.controls['cmWaistRange'].setValue(inConv);
      }
    }else{
      if(!this.waistIn){
        this.waistCm = false;
        this.waistIn = true;
        // this.userProfileForm.controls['hip'].setValue('in');
        let cmConv = this.convertToInch(this.userProfileForm.value.noWaist);
        this.userProfileForm.controls['noWaist'].setValue(cmConv);
        this.userProfileForm.controls['inWaistRange'].setValue(cmConv);
      }
    }
  }

  hipUnitChange(){
    if(this.userProfileForm.value.hip=="cm"){
      if(!this.hipCm){
        this.hipCm = true;
        this.hipIn = false;

        let cmConv = this.convertToCm(this.userProfileForm.value.noHip);
        this.userProfileForm.controls['noHip'].setValue(cmConv);
        this.userProfileForm.controls['cmHipRange'].setValue(cmConv);
      }
    }else{
      if(!this.hipIn){
        this.hipCm = false;
        this.hipIn = true;

        let inConv = this.convertToInch(this.userProfileForm.value.noHip);
        this.userProfileForm.controls['noHip'].setValue(inConv);
        this.userProfileForm.controls['inHipRange'].setValue(inConv);
      }
    }
  }

  weightUnitChange(){
    if(this.userProfileForm.value.weight=="kg"){
      if(!this.weightKg){
        this.weightKg = true;
        this.weightLb = false;
        // this.userProfileForm.controls['hip'].setValue('cm');
        let conv = this.convertToKg(this.userProfileForm.value.noWeight);
        this.userProfileForm.controls['noWeight'].setValue(conv);
        this.userProfileForm.controls['kiloRange'].setValue(conv);
      }
    }else{
      if(!this.weightLb){
        this.weightKg = false;
        this.weightLb = true;
        // this.userProfileForm.controls['hip'].setValue('in');
        let conv = this.convertToLb(this.userProfileForm.value.noWeight);
        this.userProfileForm.controls['noWeight'].setValue(conv);
        this.userProfileForm.controls['poundRange'].setValue(conv);
      }
    }
  }

  kgWeightChange(){
    this.userProfileForm.controls['noWeight'].setValue(this.userProfileForm.value.kiloRange);
  }

  lbWeightChange(){
    this.userProfileForm.controls['noWeight'].setValue(this.userProfileForm.value.poundRange);
  }

  setWeightRange(){
    if(this.userProfileForm.value.weight=="kg"){
      this.userProfileForm.controls['kiloRange'].setValue(this.userProfileForm.value.noWeight);
    }else{
      this.userProfileForm.controls['poundRange'].setValue(this.userProfileForm.value.noWeight);
    }
  }

  setHeightRange(){
    if(this.userProfileForm.value.height=="cm"){
      this.userProfileForm.controls['cmRange'].setValue(this.userProfileForm.value.noHeight);
    }else{
      this.userProfileForm.controls['ftRange'].setValue(this.userProfileForm.value.noHeight);
    }
  }

  heightTypeChange(){
    if(this.userProfileForm.value.height=="cm"){
      if(!this.cm){
        let feet = this.userProfileForm.value.noHeight*12;
        let inch = this.userProfileForm.value.noHeightIn;
        if(inch=='' || inch==null){
          inch = 0;
        }
        let toInch = eval(feet+"+"+inch);
        let cm = Math.round((toInch*2.54)*100)/100;
        this.userProfileForm.controls['noHeight'].setValue(cm);
        this.userProfileForm.controls['cmRange'].setValue(cm);
      }
      this.cm = true;
      this.ft = false;
    }else{
      if(!this.ft && this.userProfileForm.value.noHeight!=0){
        let computedHeight = Math.round((this.userProfileForm.value.noHeight/2.54)*100)/100;
        let toInch = Math.round((computedHeight/12)*100)/100;
        let height = toInch.toString().split(".");
        if(height[1]=="" || height[1]==null){
          height[1] = "0";
        }
        let feet = height[0];
        let inch = Math.round((eval(("0."+height[1])+"*"+12))*100)/100;
        this.userProfileForm.controls['noHeight'].setValue(feet);
        this.userProfileForm.controls['noHeightIn'].setValue(inch);
        this.userProfileForm.controls['ftRange'].setValue(feet);
      }
      this.cm = false;
      this.ft = true;
    }
  }

  cmHeightChange(){
    this.userProfileForm.controls['noHeight'].setValue(this.userProfileForm.value.cmRange);
  }

  ftHeightChange(){
    this.userProfileForm.controls['noHeight'].setValue(this.userProfileForm.value.ftRange);
  }
}

