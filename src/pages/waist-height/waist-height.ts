import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/*
  Generated class for the WaistHeight page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-waist-height',
  templateUrl: 'waist-height.html'
})
export class WaistHeightPage {

  waistHeightForm : FormGroup;
  cmWaist : boolean = true;
  in : boolean = false;
  cmHeight : boolean = true;
  ft : boolean = false;
  ratio : number = 0.50;
  isOnRisk : boolean = false;

  cmWaistChange(){
    this.waistHeightForm.controls['noWaist'].setValue(this.waistHeightForm.value.cmWaistRange);
  }

  inWaistChange(){
    this.waistHeightForm.controls['noWaist'].setValue(this.waistHeightForm.value.inWaistRange);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
  	this.waistHeightForm = formBuilder.group({
        gender: ['male', Validators.compose([Validators.required])],
        height: ['cm', Validators.compose([Validators.required])],
        heightIn: ['in', Validators.compose([Validators.required])],
        noHeight: ['0', Validators.compose([Validators.pattern('[0-9.]*'),Validators.required])],
        noHeightFt: ['0', Validators.compose([Validators.pattern('[0-9]*'),Validators.required])],
        noHeightIn: ['0', Validators.compose([Validators.pattern('[0-9.]*'),Validators.required])],
        cmRange: [''],
        ftRange: [''],
        waist: ['cm', Validators.compose([Validators.required])],
        noWaist: ['51', Validators.compose([Validators.required])],
        cmWaistRange: [''],
        inWaistRange: [''],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaistHeightPage');
  }

  cmChange(){
    this.waistHeightForm.controls['noHeight'].setValue(this.waistHeightForm.value.cmRange);
  }

  ftChange(){
    this.waistHeightForm.controls['noHeight'].setValue(this.waistHeightForm.value.ftRange);
  }

  setWaistRange(){
    if(this.waistHeightForm.value.waist=="cm"){
      this.waistHeightForm.controls['cmWaistRange'].setValue(this.waistHeightForm.value.noWaist);
    }else{
      this.waistHeightForm.controls['inWaistRange'].setValue(this.waistHeightForm.value.noWaist);
    }
  }

  setHeightRange(){
    if(this.waistHeightForm.value.height=="cm"){
      this.waistHeightForm.controls['cmRange'].setValue(this.waistHeightForm.value.noHeight);
    }else{
      this.waistHeightForm.controls['ftRange'].setValue(this.waistHeightForm.value.noHeight);
    }
  }

  waistUnitChange(){
    if(this.waistHeightForm.value.waist=="cm"){
      if(!this.cmWaist){
        this.cmWaist = true;
        this.in = false;
        let inConv = Math.round(eval(this.waistHeightForm.value.noWaist+'*'+2.54)*100)/100;
        this.waistHeightForm.controls['noWaist'].setValue(inConv);
        this.waistHeightForm.controls['cmWaistRange'].setValue(inConv);

        // let inConvHip = Math.round(eval(this.waistHeightForm.value.noHip+'*'+2.54)*100)/100;
        // this.waistHeightForm.controls['noHip'].setValue(inConvHip);
        // this.waistHeightForm.controls['cmHipRange'].setValue(inConvHip);
      }
    }else{
      if(!this.in){
        this.cmWaist = false;
        this.in = true;
        let cmConv = Math.round(eval(this.waistHeightForm.value.noWaist+'/'+2.54)*100)/100;
        this.waistHeightForm.controls['noWaist'].setValue(cmConv);
        this.waistHeightForm.controls['inWaistRange'].setValue(cmConv);

        // let cmConvHip = Math.round(eval(this.waistHeightForm.value.noHip+'/'+2.54)*100)/100;
        // this.waistHeightForm.controls['noHip'].setValue(cmConvHip);
        // this.waistHeightForm.controls['inHipRange'].setValue(cmConvHip);
      }
    }
  }

  heightTypeChange(){
    if(this.waistHeightForm.value.height=="cm"){
      if(!this.cmHeight){
        let feet = this.waistHeightForm.value.noHeight*12;
        let inch = this.waistHeightForm.value.noHeightIn;
        if(inch=='' || inch==null){
          inch = 0;
        }
        let toInch = eval(feet+"+"+inch);
        let cm = Math.round((toInch*2.54)*100)/100;
        this.waistHeightForm.controls['noHeight'].setValue(cm);
        this.waistHeightForm.controls['cmRange'].setValue(cm);
      }
      this.cmHeight = true;
      this.ft = false;
    }else{
      if(!this.ft && this.waistHeightForm.value.noHeight!=0){
        let computedHeight = Math.round((this.waistHeightForm.value.noHeight/2.54)*100)/100;
        let toInch = Math.round((computedHeight/12)*100)/100;
        let height = toInch.toString().split(".");
        if(height[1]=="" || height[1]==null){
          height[1] = "0";
        }
        let feet = height[0];
        let inch = Math.round((eval(("0."+height[1])+"*"+12))*100)/100;
        this.waistHeightForm.controls['noHeight'].setValue(feet);
        this.waistHeightForm.controls['noHeightIn'].setValue(inch);
        this.waistHeightForm.controls['ftRange'].setValue(feet);
      }
      this.cmHeight = false;
      this.ft = true;
    }
  }

  getRatio()
  {
    let feet = this.waistHeightForm.value.noHeight*12;
    let inch = this.waistHeightForm.value.noHeightIn;

    let waist = (this.waistHeightForm.value.waist == 'cm') ? this.waistHeightForm.value.noWaist : this.convertToCm(this.waistHeightForm.value.noWaist);
    let height = (this.waistHeightForm.value.height == 'cm') ? this.waistHeightForm.value.noHeight : this.convertToCm(eval(feet+"+"+inch));

    this.ratio = Math.round(eval(waist + '/' + height)*100)/100;

     if(this.ratio <= 0.50){
       this.isOnRisk = false;
     }else{
       this.isOnRisk = true;
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
