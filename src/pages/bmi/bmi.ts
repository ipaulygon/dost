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
  submitAttempt : boolean = false;
  kilo : boolean = true;
  pound : boolean = false;
  cm : boolean = true;
  ft : boolean = false;
  background : boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public toastCtrl: ToastController,) {
    this.bmiForm = formBuilder.group({
        gender: ['', Validators.compose([Validators.required])],
        birth: ['', Validators.compose([Validators.required])],
        weight: ['kg', Validators.compose([Validators.required])],
        noWeight: ['0', Validators.compose([Validators.required])],
        kiloRange: [''],
        poundRange: [''],
        height: ['cm', Validators.compose([Validators.required])],
        heightIn: ['in', Validators.compose([Validators.required])],
        noHeight: ['0', Validators.compose([Validators.required])],
        noHeightFt: ['0', Validators.compose([Validators.required])],
        noHeightIn: ['0', Validators.compose([Validators.required])],
        cmRange: [''],
        ftRange: [''],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BmiPage');
  }

  kiloChange(){
    this.bmiForm.controls['noWeight'].setValue(this.bmiForm.value.kiloRange);
  }

  poundChange(){
    this.bmiForm.controls['noWeight'].setValue(this.bmiForm.value.poundRange);
  }
  
  cmChange(){
    this.bmiForm.controls['noHeight'].setValue(this.bmiForm.value.cmRange);
  }

  ftChange(){
    this.bmiForm.controls['noHeight'].setValue(this.bmiForm.value.ftRange);
  }

  weightChange(){
    if(this.bmiForm.value.weight=="kg"){
      this.bmiForm.controls['kiloRange'].setValue(this.bmiForm.value.noWeight);
    }else{
      this.bmiForm.controls['poundRange'].setValue(this.bmiForm.value.noWeight);
    }
  }

  heightChange(){
    
  }

  weightTypeChange(){
    if(this.bmiForm.value.weight=="kg"){
      if(!this.kilo){
        this.kilo = true;
        this.pound = false;
        //ommit 0.99999999
        let convertedWeight = Math.round((eval(this.bmiForm.value.noWeight+"/"+2.2))*10)/10;
        this.bmiForm.controls['noWeight'].setValue(convertedWeight);
        this.bmiForm.controls['kiloRange'].setValue(convertedWeight);
      }
    }else{
      if(!this.pound){
        this.kilo = false;
        this.pound = true;
        //ommit 0.99999999
        let convertedWeight = Math.round((eval(this.bmiForm.value.noWeight+"*"+2.2))*10)/10;
        this.bmiForm.controls['noWeight'].setValue(convertedWeight);
        this.bmiForm.controls['poundRange'].setValue(convertedWeight);
      }
    }
  }

  heightTypeChange(){
    if(this.bmiForm.value.height=="cm"){
      if(!this.cm){
        this.cm = true;
        this.ft = false;
        let feet = eval(this.bmiForm.value.noHeight+"*"+12);
        let toInch = eval(feet+"+"+this.bmiForm.value.noHeightIn);
        let cm = Math.round((toInch*2.54)*100)/100;
        this.bmiForm.controls['noHeight'].setValue(cm);
        this.bmiForm.controls['cmRange'].setValue(cm);
      }
    }else{
      if(!this.ft){
        this.cm = false;
        this.ft = true;
        let computedHeight = Math.round((eval(this.bmiForm.value.noHeight+"/"+2.54))*100)/100;
        let toInch = Math.round((computedHeight/12)*100)/100;
        let height = toInch.toString().split(".");
        let feet = height[0];
        let inch = Math.round((eval(("0."+height[1])+"*"+12))*100)/100;
        this.bmiForm.controls['noHeight'].setValue(feet);
        this.bmiForm.controls['noHeightIn'].setValue(inch);
        this.bmiForm.controls['ftRange'].setValue(feet);
      }
    }
  }

  submit(){
    let toast = this.toastCtrl.create({
      message: 'Shit',
      showCloseButton: true,
      closeButtonText: "X",
      dismissOnPageChange: false,
      duration: 2000,
    });
    toast.present();
  }

}
