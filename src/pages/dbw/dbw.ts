import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Dbw page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dbw',
  templateUrl: 'dbw.html'
})
export class DbwPage {
  dbwForm : FormGroup;
  message : string = "Please complete the following inputs to compute your DBW";
  age : number;
  cm : boolean = true;
  ft : boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,) {
    this.dbwForm = formBuilder.group({
        gender: ['male', Validators.compose([Validators.required])],
        birth: ['', Validators.compose([Validators.required])],
        height: ['cm', Validators.compose([Validators.required])],
        heightIn: ['in', Validators.compose([Validators.required])],
        noHeight: ['0', Validators.compose([Validators.pattern('[0-9.]*'),Validators.required])],
        noHeightFt: ['0', Validators.compose([Validators.pattern('[0-9]*'),Validators.required])],
        noHeightIn: ['0', Validators.compose([Validators.pattern('[0-9.]*'),Validators.required])],
        cmRange: [''],
        ftRange: [''],
    });
  }

  cmChange(){
    this.dbwForm.controls['noHeight'].setValue(this.dbwForm.value.cmRange);
    this.submit();
  }

  ftChange(){
    this.dbwForm.controls['noHeight'].setValue(this.dbwForm.value.ftRange);
    this.submit();
  }

  heightChange(){
    if(this.cm){
      this.dbwForm.controls['cmRange'].setValue(this.dbwForm.value.noHeight);
    }else{
      this.dbwForm.controls['ftRange'].setValue(this.dbwForm.value.noHeight);
    }
    this.submit();
  }

  heightTypeChange(){
    if(this.dbwForm.value.height=="cm"){
      if(!this.cm){
        let feet = this.dbwForm.value.noHeight*12;
        let inch = this.dbwForm.value.noHeightIn;
        if(inch=='' || inch==null){
          inch = 0;
        }
        let toInch = eval(feet+"+"+inch);
        let cm = Math.round((toInch*2.54)*100)/100;
        this.dbwForm.controls['noHeight'].setValue(cm);
        this.dbwForm.controls['cmRange'].setValue(cm);
      }
      this.cm = true;
      this.ft = false;
    }else{
      if(!this.ft && this.dbwForm.value.noHeight!=0){
        let computedHeight = Math.round((this.dbwForm.value.noHeight/2.54)*100)/100;
        let toInch = Math.round((computedHeight/12)*100)/100;
        let height = toInch.toString().split(".");
        if(height[1]=="" || height[1]==null){
          height[1] = "0";
        }
        let feet = height[0];
        let inch = Math.round((eval(("0."+height[1])+"*"+12))*100)/100;
        this.dbwForm.controls['noHeight'].setValue(feet);
        this.dbwForm.controls['noHeightIn'].setValue(inch);
        this.dbwForm.controls['ftRange'].setValue(feet);
      }
      this.cm = false;
      this.ft = true;
    }
  }

  getAge(){
    let today = new Date();
    let birthDate = new Date(this.dbwForm.value.birth);
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
    let birthDate = new Date(this.dbwForm.value.birth);
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
    this.age = this.getAge();

  }

}
