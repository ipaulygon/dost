import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SQLite } from 'ionic-native';

/*
  Generated class for the Bmi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bmi',
  templateUrl: 'bmi.html'
})
export class BmiPage {
  bmiForm : FormGroup;
  submitAttempt : boolean = true;
  kilo : boolean = true;
  pound : boolean = false;
  cm : boolean = true;
  ft : boolean = false;
  background : boolean = true;
  message : string = "Please complete the following inputs to compute your BMI";
  status : any;
  abnormal : boolean = false;
  normal : boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public toastCtrl: ToastController,) {
    this.bmiForm = formBuilder.group({
        gender: ['male', Validators.compose([Validators.required])],
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
    });
  }

  kiloChange(){
    this.bmiForm.controls['noWeight'].setValue(this.bmiForm.value.kiloRange);
    this.submit();
  }

  poundChange(){
    this.bmiForm.controls['noWeight'].setValue(this.bmiForm.value.poundRange);
    this.submit();
  }
  
  cmChange(){
    this.bmiForm.controls['noHeight'].setValue(this.bmiForm.value.cmRange);
    this.submit();
  }

  ftChange(){
    this.bmiForm.controls['noHeight'].setValue(this.bmiForm.value.ftRange);
    this.submit();
  }

  weightChange(){
    if(this.bmiForm.value.weight=="kg"){
      this.bmiForm.controls['kiloRange'].setValue(this.bmiForm.value.noWeight);
    }else{
      this.bmiForm.controls['poundRange'].setValue(this.bmiForm.value.noWeight);
    }
    this.submit();
  }

  heightChange(){
    if(this.cm){
      this.bmiForm.controls['cmRange'].setValue(this.bmiForm.value.noHeight);
    }else{
      this.bmiForm.controls['ftRange'].setValue(this.bmiForm.value.noHeight);
    }
    this.submit();
  }

  weightTypeChange(){
    if(this.bmiForm.value.weight=="kg"){
      if(!this.kilo){
        //ommit 0.99999999
        let convertedWeight = Math.round((this.bmiForm.value.noWeight/2.2)*10)/10;
        this.bmiForm.controls['noWeight'].setValue(convertedWeight);
        this.bmiForm.controls['kiloRange'].setValue(convertedWeight);
      }
      this.kilo = true;
      this.pound = false;
    }else{
      if(!this.pound){
        //ommit 0.99999999
        let convertedWeight = Math.round((this.bmiForm.value.noWeight*2.2)*10)/10;
        this.bmiForm.controls['noWeight'].setValue(convertedWeight);
        this.bmiForm.controls['poundRange'].setValue(convertedWeight);
      }
      this.kilo = false;
      this.pound = true;
    }
  }

  heightTypeChange(){
    if(this.bmiForm.value.height=="cm"){
      if(!this.cm){
        let feet = this.bmiForm.value.noHeight*12;
        let inch = this.bmiForm.value.noHeightIn;
        if(inch=='' || inch==null){
          inch = 0;
        }
        let toInch = eval(feet+"+"+inch);
        let cm = Math.round((toInch*2.54)*100)/100;
        this.bmiForm.controls['noHeight'].setValue(cm);
        this.bmiForm.controls['cmRange'].setValue(cm);
      }
      this.cm = true;
      this.ft = false;
    }else{
      if(!this.ft && this.bmiForm.value.noHeight!=0){
        let computedHeight = Math.round((this.bmiForm.value.noHeight/2.54)*100)/100;
        let toInch = Math.round((computedHeight/12)*100)/100;
        let height = toInch.toString().split(".");
        if(height[1]=="" || height[1]==null){
          height[1] = "0";
        }
        let feet = height[0];
        let inch = Math.round((eval(("0."+height[1])+"*"+12))*100)/100;
        this.bmiForm.controls['noHeight'].setValue(feet);
        this.bmiForm.controls['noHeightIn'].setValue(inch);
        this.bmiForm.controls['ftRange'].setValue(feet);
      }
      this.cm = false;
      this.ft = true;
    }
  }

  getAge(){
    let today = new Date();
    let birthDate = new Date(this.bmiForm.value.birth);
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
    let birthDate = new Date(this.bmiForm.value.birth);
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

  submit(){
    if(this.bmiForm.valid){
      if(this.bmiForm.value.noWeight!=0 || this.bmiForm.value.noHeight!=0 || this.bmiForm.value.noHeightIn!=0){
        let weight = 0;
        let height = 0;
        if(!this.kilo){
          weight = Math.round((this.bmiForm.value.noWeight/2.2)*100)/100;
        }else{
          weight = this.bmiForm.value.noWeight;
        }
        //end of weight
        if(this.cm){
          height = Math.round((this.bmiForm.value.noHeight/100)*100)/100;
        }else{
          let feet = this.bmiForm.value.noHeight*12;
          let inch = this.bmiForm.value.noHeightIn;
          if(inch=='' || inch==null){
            inch = 0;
          }
          let toInch = eval(feet+"+"+inch);
          let cm = Math.round((toInch*2.54)*100)/100;
          height = Math.round((cm/100)*100)/100;
        }//end of height
        //getAge && getMonth
        let age = this.getAge();
        let month = this.getMonth();
        //start BMI
        let bmi = Math.round((weight/(height*height))*100)/100;
        this.message = "Your BMI is " + bmi + "kg/m²";
        //start status
        //0
        if(age == 0){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 14.5){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 14.5 && bmi < 15.6){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 15.6 && bmi < 16.9){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 16.9 && bmi < 18.4){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 18.4 && bmi < 20){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 20){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 13.9){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 13.9 && bmi < 15.1){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 15.1 && bmi < 16.5){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 16.5 && bmi < 18){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 18 && bmi < 19.8){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 19.8){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //1
        if(age == 1){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 13.6){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 13.6 && bmi < 14.6){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 14.6 && bmi < 15.8){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 15.8 && bmi < 17.1){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 17.1 && bmi < 18.6){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 18.6){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 13.1){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 13.1 && bmi < 14.2){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 14.2 && bmi < 15.4){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 15.4 && bmi < 16.9){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 16.9 && bmi < 18.5){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 18.5){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //2
        if(age == 2){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 13.4){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 13.4 && bmi < 14.5){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 14.5 && bmi < 15.6){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 15.6 && bmi < 16.9){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 16.9 && bmi < 18.4){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 18.4){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 13.1){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 13.1 && bmi < 14.2){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 14.2 && bmi < 15.4){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 15.4 && bmi < 16.8){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 16.8 && bmi < 18.4){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 18.4){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //3
        if(age == 3){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 13.1){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 13.1 && bmi < 14.2){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 14.2 && bmi < 15.3){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 15.3 && bmi < 16.7){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 16.7 && bmi < 18.2){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 18.2){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 12.8){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 12.8 && bmi < 14){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 14 && bmi < 15.3){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 15.3 && bmi < 16.8){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 16.8 && bmi < 18.5){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 18.5){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //4
        if(age == 4){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 12.9){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 12.9 && bmi < 14){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 14 && bmi < 15.2){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 15.2 && bmi < 16.6){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 16.6 && bmi < 18.3){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 18.3){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 12.7){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 12.7 && bmi < 13.9){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 13.9 && bmi < 15.3){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 15.3 && bmi < 16.9){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 16.9 && bmi < 18.8){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 18.8){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //5
        if(age == 5){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 13){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 13 && bmi < 14.1){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 14.1 && bmi < 15.3){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 15.3 && bmi < 16.7){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 16.7 && bmi < 18.5){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 18.5){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 12.7){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 12.7 && bmi < 13.9){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 13.9 && bmi < 15.3){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 15.3 && bmi < 17){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 17 && bmi < 19.2){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 19.2){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //6
        if(age == 6){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 13.1){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 13.1 && bmi < 14.2){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 14.2 && bmi < 15.5){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 15.5 && bmi < 17){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 17 && bmi < 19){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 19){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 12.7){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 12.7 && bmi < 13.9){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 13.9 && bmi < 15.4){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 15.4 && bmi < 17.3){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 17.3 && bmi < 19.7){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 19.7){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //7
        if(age == 7){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 13.3){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 13.3 && bmi < 14.4){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 14.4 && bmi < 15.7){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 15.7 && bmi < 17.4){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 17.4 && bmi < 19.6){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 19.6){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 12.9){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 12.9 && bmi < 14.1){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 14.1 && bmi < 15.7){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 15.7 && bmi < 17.7){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 17.7 && bmi < 20.5){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 20.5){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //8
        if(age == 8){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 13.5){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 13.5 && bmi < 14.6){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 14.6 && bmi < 16){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 16 && bmi < 17.9){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 17.9 && bmi < 20.4){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 20.4){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 13.1){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 13.1 && bmi < 14.4){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 14.4 && bmi < 16.1){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 16.1 && bmi < 18.3){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 18.3 && bmi < 21.4){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 21.4){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //9
        if(age == 9){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 13.7){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 13.7 && bmi < 14.9){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 14.9 && bmi < 16.4){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 16.4 && bmi < 18.4){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 18.4 && bmi < 21.3){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 21.3){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 13.4){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 13.4 && bmi < 14.8){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 14.8 && bmi < 16.6){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 16.6 && bmi < 19){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 19 && bmi < 22.5){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 22.5){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //10
        if(age == 10){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 14){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 14 && bmi < 15.3){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 15.3 && bmi < 16.9){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 16.9 && bmi < 19.1){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 19.1 && bmi < 22.4){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 22.4){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 13.8){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 13.8 && bmi < 15.3){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 15.3 && bmi < 17.2){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 17.2 && bmi < 19.8){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 19.8 && bmi < 23.6){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 23.6){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //11
        if(age == 11){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 14.4){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 14.4 && bmi < 15.7){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 15.7 && bmi < 17.5){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 17.5 && bmi < 19.9){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 19.9 && bmi < 23.5){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 23.5){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 14.3){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 14.3 && bmi < 15.9){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 15.9 && bmi < 17.9){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 17.9 && bmi < 20.7){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 20.7 && bmi < 24.9){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 24.9){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //12
        if(age == 12){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 14.9){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 14.9 && bmi < 16.3){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 16.3 && bmi < 18.2){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 18.2 && bmi < 20.8){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 20.8 && bmi < 24.7){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 24.7){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 14.9){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 14.9 && bmi < 16.6){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 16.6 && bmi < 18.7){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 18.7 && bmi < 21.7){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 21.7 && bmi < 26.1){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 26.1){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //13
        if(age == 13){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 15.4){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 15.4 && bmi < 17){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 17 && bmi < 18.9){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 18.9 && bmi < 21.7){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 21.7 && bmi < 25.8){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 25.8){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 15.4){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 15.4 && bmi < 17.2){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 17.2 && bmi < 19.5){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 19.5 && bmi < 22.7){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 22.7 && bmi < 27.2){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 27.2){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //14
        if(age == 14){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 16){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 16 && bmi < 17.6){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 17.6 && bmi < 19.7){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 19.7 && bmi < 22.6){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 22.6 && bmi < 26.9){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 26.9){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 15.8){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 15.8 && bmi < 17.7){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 17.7 && bmi < 20.2){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 20.2 && bmi < 23.5){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 23.5 && bmi < 28.2){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 28.2){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //15
        if(age == 15){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 16.5){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 16.5 && bmi < 18.2){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 18.2 && bmi < 20.4){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 20.4 && bmi < 23.5){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 23.5 && bmi < 27.8){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 27.8){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 16.2){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 16.2 && bmi < 18.1){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 18.1 && bmi < 20.7){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 20.7 && bmi < 24.1){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 24.1 && bmi < 28.8){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 28.8){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //16
        if(age == 16){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 16.9){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 16.9 && bmi < 18.7){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 18.7 && bmi < 21.1){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 21.1 && bmi < 24.2){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 24.2 && bmi < 28.6){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 28.6){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 16.3){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 16.3 && bmi < 18.4){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 18.4 && bmi < 21){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 21 && bmi < 24.5){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 24.5 && bmi < 29.3){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 29.3){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //17
        if(age == 17){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 17.3){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 17.3 && bmi < 19.2){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 19.2 && bmi < 21.7){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 21.7 && bmi < 24.9){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 24.9 && bmi < 29.2){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 29.2){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 16.4){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 16.4 && bmi < 18.6){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 18.6 && bmi < 21.2){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 21.2 && bmi < 24.8){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 24.8 && bmi < 29.5){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 29.5){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //18
        if(age == 18){
          //male
          if(this.bmiForm.value.gender=="male"){
            if(bmi < 17.5){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 17.5 && bmi < 19.6){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 19.6 && bmi < 22.2){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 22.2 && bmi < 25.4){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 25.4 && bmi < 29.7){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 29.7){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
          //female
          else{
            if(bmi < 16.5){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi >= 16.5 && bmi < 18.7){
              this.abnormal = true; this.normal = false; this.status = "THINNESS";
            }else if(bmi >= 18.7 && bmi < 21.4){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi >= 21.4 && bmi < 25){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi >= 25 && bmi < 29.7){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi >= 29.7){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          }
        }
        //above
        if(age >= 19){
          if(bmi < 18.5){
            this.abnormal = true;
            this.normal = false;
            this.status = "UNDERWEIGHT";
          }else if(bmi >= 18.5 && bmi< 25){
            this.abnormal = false;
            this.normal = true;
            this.status = "NORMAL";
          }else if(bmi >= 25 && bmi < 30){
            this.abnormal = true;
            this.normal = false;
            this.status = "OVERWEIGHT";
          }else{
            this.abnormal = true;
            this.normal = false;
            this.status = "OBESE";
          }
        }
      }
    }
  }

}
