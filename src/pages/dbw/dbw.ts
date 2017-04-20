import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MaxValidator } from '../../validators/max';

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
  kilo : boolean = true;
  pound : boolean = false;
  dbw: any;
  dbwRange: any;
  dbwStatus: any;
  dbwNormal : boolean;
  classification: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public storage: Storage, public alertCtrl: AlertController) {
    this.dbwForm = formBuilder.group({
        gender: ['M', Validators.compose([Validators.required])],
        birth: ['', Validators.compose([Validators.required])],
        weight: ['kg', Validators.compose([Validators.required])],
        noWeight: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{2})?$'),
          Validators.required,
          Validators.maxLength(5),
          MaxValidator.maxValueKg
        ])],
        kiloRange: [''],
        poundRange: [''],
        height: ['cm', Validators.compose([Validators.required])],
        heightIn: ['in', Validators.compose([Validators.required])],
        noHeight: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{2})?$'),
          Validators.required,
          Validators.maxLength(5),
          MaxValidator.maxValueHeightCm
        ])],
        noHeightFt: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{2})?$'),
          Validators.required,
          Validators.maxLength(1),
          MaxValidator.maxValueHeightFt
        ])],
        noHeightIn: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{2})?$'),
          Validators.required,
          Validators.maxLength(1),
          MaxValidator.maxValueHeightIn
        ])],
        cmRange: [''],
        ftRange: [''],
    });
  }

  validate(){
    if(!this.dbwForm.controls['noHeight'].valid || !this.dbwForm.controls['noHeightFt'].valid || !this.dbwForm.controls['noHeightIn'].valid || !this.dbwForm.controls['noWeight'].valid){
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'Please enter a valid number',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  cmChange(){
    this.dbwForm.controls['noHeight'].setValue(this.dbwForm.value.cmRange);
    this.submit();
  }

  ftChange(){
    this.dbwForm.controls['noHeight'].setValue(this.dbwForm.value.ftRange);
    this.submit();
  }

  kiloChange(){
    this.dbwForm.controls['noWeight'].setValue(this.dbwForm.value.kiloRange);
    this.submit();
  }

  poundChange(){
    this.dbwForm.controls['noWeight'].setValue(this.dbwForm.value.poundRange);
    this.submit();
  }

  heightChange(){
    if(this.cm){
      this.dbwForm.controls['cmRange'].setValue(this.dbwForm.value.noHeight);
    }else{
      this.dbwForm.controls['ftRange'].setValue(this.dbwForm.value.noHeight);
    }
    this.validate();
    this.submit();
  }

  weightChange(){
    if(this.dbwForm.value.weight=="kg"){
      this.dbwForm.controls['kiloRange'].setValue(this.dbwForm.value.noWeight);
    }else{
      this.dbwForm.controls['poundRange'].setValue(this.dbwForm.value.noWeight);
    }
    this.validate();
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

  weightTypeChange(){
    if(this.dbwForm.value.weight=="kg"){
      if(!this.kilo){
        this.dbwForm.controls["noWeight"].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{2})?$'), 
          Validators.maxLength(5),
          MaxValidator.maxValueKg
        ]);
        let convertedWeight = Math.round((this.dbwForm.value.noWeight/2.2)*10)/10;
        this.dbwForm.controls['noWeight'].setValue(convertedWeight);
        this.dbwForm.controls['kiloRange'].setValue(convertedWeight);
      }
      this.kilo = true;
      this.pound = false;
    }else{
      if(!this.pound){
        this.dbwForm.controls["noWeight"].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{2})?$'), 
          Validators.maxLength(6),
          MaxValidator.maxValueLb
        ]);
        let convertedWeight = Math.round((this.dbwForm.value.noWeight*2.2)*10)/10;
        this.dbwForm.controls['noWeight'].setValue(convertedWeight);
        this.dbwForm.controls['poundRange'].setValue(convertedWeight);
      }
      this.kilo = false;
      this.pound = true;
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
    if(this.dbwForm.valid){
      if(this.dbwForm.value.noWeight!=0 && this.dbwForm.value.noHeight!=0 && this.dbwForm.value.birthDate!=0){
        this.classification = true;
        this.age = this.getAge();
        let weight = 0;
        let height = 0;
        if(!this.kilo){
          weight = Math.round((this.dbwForm.value.noWeight/2.2)*100)/100;
        }else{
          weight = this.dbwForm.value.noWeight;
        }
        //end of weight
        if(this.ft){
          let feet = this.dbwForm.value.noHeight*12;
          let inch = this.dbwForm.value.noHeightIn;
          if(inch=='' || inch==null){
            inch = 0;
          }
          let toInch = eval(feet+"+"+inch);
          height = Math.round((toInch*2.54)*100)/100;
        }else{
          height = this.dbwForm.value.noHeight;
        }
        console.log(this.dbwForm.value.birth);
        console.log(height);
        let age = this.getAge();
        let month = this.getMonth();
        let gender = this.dbwForm.value.gender;
        let p = Math.round(((height-100)*.1)*100)/100;
        let dbw = parseInt((Math.round(((height-100)-(p))*100)/100).toFixed(2));
        let dbwCut = dbw*0.1;
        let dbwMin = dbw-dbwCut;
        let dbwMax = dbw+dbwCut;
        if(height!=0 && this.dbwForm.value.birth!=''){
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
      }
      else{
        this.classification = false;
        this.message = "Please complete the following inputs to compute your BMI";
      }
    }
  }

}
