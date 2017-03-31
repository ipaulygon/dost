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
        let toInch = feet+inch;
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
          let toInch = feet+inch;
          let cm = Math.round((toInch*2.54)*100)/100;
          height = Math.round((cm/100)*100)/100;
        }//end of height
        //start BMI
        let bmi = Math.round((weight/(height*height))*100)/100;
        this.message = "Your BMI is " + bmi + "kg/m²";
        //start status
        if(bmi<18.5){
          this.abnormal = true;
          this.normal = false;
          this.status = "UNDERWEIGHT";
        }else if(bmi >= 18.5 && bmi<25){
          this.abnormal = false;
          this.normal = true;
          this.status = "NORMAL";
        }else if(bmi >=25 && bmi <30){
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
