import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/*
  Generated class for the WaistHip page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-waist-hip',
  templateUrl: 'waist-hip.html'
})
export class WaistHipPage {

  waistHipForm : FormGroup;
  submitAttempt : boolean = false;
  cm : boolean = true;
  in : boolean = false;
  background : boolean = true;
  ratio : number = 1.00;
  isOnRisk : boolean = true;


  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public toastCtrl: ToastController,) {
    this.waistHipForm = formBuilder.group({
    	gender: ['male', Validators.compose([Validators.required])],
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
    console.log('ionViewDidLoad WaistHipPage');
  }

  cmWaistChange(){
    this.waistHipForm.controls['noWaist'].setValue(this.waistHipForm.value.cmWaistRange);
  }

  inWaistChange(){
    this.waistHipForm.controls['noWaist'].setValue(this.waistHipForm.value.inWaistRange);
  }

  cmHipChange(){
    this.waistHipForm.controls['noHip'].setValue(this.waistHipForm.value.cmHipRange);
  }

  inHipChange(){
    this.waistHipForm.controls['noHip'].setValue(this.waistHipForm.value.inHipRange);
  }

  getRatio()
  {
  	 this.ratio = Math.round(eval(this.waistHipForm.value.noWaist + '/' + this.waistHipForm.value.noHip)*100)/100;
  	 if((this.ratio >= 0.90) && (this.waistHipForm.value.gender == 'male')){
  	 	this.isOnRisk = true;
  	 }else if((this.ratio >= 0.85) && (this.waistHipForm.value.gender == 'female')){
  	 	this.isOnRisk = true;
  	 }else{
  	 	this.isOnRisk = false;
  	 }
  }

  waistUnitChange(){
    if(this.waistHipForm.value.waist=="cm"){
      if(!this.cm){
        this.cm = true;
        this.in = false;
        this.waistHipForm.controls['hip'].setValue('cm');
        let inConv = Math.round(eval(this.waistHipForm.value.noWaist+'*'+2.54)*100)/100;
        this.waistHipForm.controls['noWaist'].setValue(inConv);
        this.waistHipForm.controls['cmWaistRange'].setValue(inConv);

        let inConvHip = Math.round(eval(this.waistHipForm.value.noHip+'*'+2.54)*100)/100;
        this.waistHipForm.controls['noHip'].setValue(inConvHip);
        this.waistHipForm.controls['cmHipRange'].setValue(inConvHip);
      }
    }else{
      if(!this.in){
        this.cm = false;
        this.in = true;
        this.waistHipForm.controls['hip'].setValue('in');
        let cmConv = Math.round(eval(this.waistHipForm.value.noWaist+'/'+2.54)*100)/100;
        this.waistHipForm.controls['noWaist'].setValue(cmConv);
        this.waistHipForm.controls['inWaistRange'].setValue(cmConv);

        let cmConvHip = Math.round(eval(this.waistHipForm.value.noHip+'/'+2.54)*100)/100;
        this.waistHipForm.controls['noHip'].setValue(cmConvHip);
        this.waistHipForm.controls['inHipRange'].setValue(cmConvHip);
      }
    }
  }

  hipUnitChange(){
    if(this.waistHipForm.value.hip=="cm"){
      if(!this.cm){
        this.cm = true;
        this.in = false;
        this.waistHipForm.controls['waist'].setValue('cm');

        let inConv = Math.round(eval(this.waistHipForm.value.noWaist+'*'+2.54)*100)/100;
        this.waistHipForm.controls['noWaist'].setValue(inConv);
        this.waistHipForm.controls['cmWaistRange'].setValue(inConv);

        let inConvHip = Math.round(eval(this.waistHipForm.value.noHip+'*'+2.54)*100)/100;
        this.waistHipForm.controls['noHip'].setValue(inConvHip);
        this.waistHipForm.controls['cmHipRange'].setValue(inConvHip);
      }
    }else{
      if(!this.in){
        this.cm = false;
        this.in = true;
        this.waistHipForm.controls['waist'].setValue('in');

        let cmConv = Math.round(eval(this.waistHipForm.value.noWaist+'/'+2.54)*100)/100;
        this.waistHipForm.controls['noWaist'].setValue(cmConv);
        this.waistHipForm.controls['inWaistRange'].setValue(cmConv);

        let cmConvHip = Math.round(eval(this.waistHipForm.value.noHip+'/'+2.54)*100)/100;
        this.waistHipForm.controls['noHip'].setValue(cmConvHip);
        this.waistHipForm.controls['inHipRange'].setValue(cmConvHip);
      }
    }
  }

}
