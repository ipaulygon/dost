import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
  cmWaist : boolean = true;
  inWaist : boolean = false;
  cmHip : boolean = true;
  inHip : boolean = false;
  background : boolean = true;
  ratio : number = 1.00;
  isOnRisk : boolean = true;


  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController) {
    this.waistHipForm = formBuilder.group({
    	gender: ['male', Validators.compose([Validators.required])],
        waist: ['cm', Validators.compose([Validators.required])],
        noWaist: ['51', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{2})?$'),Validators.required])],
        hip: ['cm', Validators.compose([Validators.required])],
        noHip: ['51', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{2})?$'),Validators.required])],
        cmWaistRange: [''],
        inWaistRange: [''],
        cmHipRange: [''],
        inHipRange: [''],        
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaistHipPage');
  }

  validate(){
    if(!this.waistHipForm.controls['noWaist'].valid || !this.waistHipForm.controls['noHip'].valid){
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'Please enter a valid number',
        buttons: ['OK']
      });
      alert.present();
    }
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

  setWaistRange(){
    if(this.waistHipForm.value.waist=="cm"){
      this.waistHipForm.controls['cmWaistRange'].setValue(this.waistHipForm.value.noWaist);
    }else{
      this.waistHipForm.controls['inWaistRange'].setValue(this.waistHipForm.value.noWaist);
    }
    this.validate();
  }

  setHipRange(){
    if(this.waistHipForm.value.hip=="cm"){
      this.waistHipForm.controls['cmHipRange'].setValue(this.waistHipForm.value.noHip);
    }else{
      this.waistHipForm.controls['inHipRange'].setValue(this.waistHipForm.value.noHip);
    }
    this.validate();
  }

  getRatio()
  {
    let waist = (this.waistHipForm.value.waist == 'cm') ? this.waistHipForm.value.noWaist : this.convertToCm(this.waistHipForm.value.noWaist);
    let hip = (this.waistHipForm.value.hip == 'cm') ? this.waistHipForm.value.noHip : this.convertToCm(this.waistHipForm.value.noHip);


  	 this.ratio = Math.round(eval(waist + '/' + hip)*100)/100;

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
      if(!this.cmWaist){
        this.cmWaist = true;
        this.inWaist = false;
        // this.waistHipForm.controls['hip'].setValue('cm');
        let inConv = Math.round(eval(this.waistHipForm.value.noWaist+'*'+2.54)*100)/100;
        this.waistHipForm.controls['noWaist'].setValue(inConv);
        this.waistHipForm.controls['cmWaistRange'].setValue(inConv);
      }
    }else{
      if(!this.inWaist){
        this.cmWaist = false;
        this.inWaist = true;
        // this.waistHipForm.controls['hip'].setValue('in');
        let cmConv = Math.round(eval(this.waistHipForm.value.noWaist+'/'+2.54)*100)/100;
        this.waistHipForm.controls['noWaist'].setValue(cmConv);
        this.waistHipForm.controls['inWaistRange'].setValue(cmConv);
      }
    }
  }

  hipUnitChange(){
    if(this.waistHipForm.value.hip=="cm"){
      if(!this.cmHip){
        this.cmHip = true;
        this.inHip = false;

        let cmConv = this.convertToCm(this.waistHipForm.value.noHip);
        this.waistHipForm.controls['noHip'].setValue(cmConv);
        this.waistHipForm.controls['cmHipRange'].setValue(cmConv);
      }
    }else{
      if(!this.inHip){
        this.cmHip = false;
        this.inHip = true;

        let inConv = this.convertToInch(this.waistHipForm.value.noHip);
        this.waistHipForm.controls['noHip'].setValue(inConv);
        this.waistHipForm.controls['inHipRange'].setValue(inConv);
      }
    }
  }

  convertToInch(val)
  {
    return Math.round(eval(val+'/'+2.54)*100)/100;
  }

  convertToCm(val)
  {
    return Math.round(eval(val+'*'+2.54)*100)/100;
  }

}
