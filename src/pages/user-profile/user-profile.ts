import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
  	this.userProfileForm = formBuilder.group({
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