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
  message : string = "Please complete the following inputs to compute your Desirable Body Weight";
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
  maxLengthWeight: number =  6;
  maxLengthHeight: number = 6;
  maxLengthHeightIn: number = 5;
  heightCard: boolean = false;
  formErrors = {
    'noWeight': [],
    'noHeight': [],
    'noHeightIn': [],
  };

  validationMessages = {
    'noWeight': {
      'required': 'Weight is required.',
      'maxlength': 'Weight cannot be more than '+ this.maxLengthWeight +' characters long.',
      'pattern': 'Weight must contain only valid values.',
      'exceed': 'Weight must not exceed the range values.',
      'less': 'Weight must not be less than 0.'
    },
    'noHeight': {
      'required': 'Height is required.',
      'maxlength': 'Height cannot be more than '+ this.maxLengthHeight +' characters long.',
      'pattern': 'Height must contain only valid values.',
      'exceed': 'Height must not exceed the range values.',
      'less': 'Height must not be less than 0.'
    },
    'noHeightIn': {
      'required': 'Height Inches is required.',
      'maxlength': 'Height Inches cannot be more than 5 characters long.',
      'pattern': 'Height Inches must contain only valid values.',
      'exceed': 'Height Inches must not exceed the range values.',
      'less': 'Height Inches must not be less than 0.'
    }
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public storage: Storage, public alertCtrl: AlertController) {
    this.dbwForm = formBuilder.group({
        gender: ['M', Validators.compose([Validators.required])],
        birth: ['', Validators.compose([Validators.required])],
        weight: ['kg', Validators.compose([Validators.required])],
        noWeight: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
          MaxValidator.maxValueKg
        ])],
        kiloRange: [''],  
        poundRange: [''],
        height: ['cm', Validators.compose([Validators.required])],
        heightIn: ['in', Validators.compose([Validators.required])],
        noHeight: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
          MaxValidator.maxValueHeightCm
        ])],
        noHeightIn: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(5),
          MaxValidator.maxValueHeightIn
        ])],
        cmRange: [''],
        ftRange: [''],
    });
    this.dbwForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.onValueChanged(data));
    this.dbwForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.submit());
  }

  onValueChanged(data?: any) {
    if (!this.dbwForm) { return; }
    const form = this.dbwForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.dbwForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  cmChange(){
    this.dbwForm.controls['noHeight'].setValue(this.dbwForm.value.cmRange);
  }

  ftChange(){
    this.dbwForm.controls['noHeight'].setValue(this.dbwForm.value.ftRange);
  }

  kiloChange(){
    this.dbwForm.controls['noWeight'].setValue(this.dbwForm.value.kiloRange);
  }

  poundChange(){
    this.dbwForm.controls['noWeight'].setValue(this.dbwForm.value.poundRange);
  }

  heightChange(){
    if(this.cm){
      this.dbwForm.controls['cmRange'].setValue(this.dbwForm.value.noHeight);
    }else{
      this.dbwForm.controls['ftRange'].setValue(this.dbwForm.value.noHeight);
    }
  }

  weightChange(){
    if(this.dbwForm.value.weight=="kg"){
      this.dbwForm.controls['kiloRange'].setValue(this.dbwForm.value.noWeight);
    }else{
      this.dbwForm.controls['poundRange'].setValue(this.dbwForm.value.noWeight);
    }
  }

  heightTypeChange(){
    if(this.dbwForm.value.height=="cm"){
      if(!this.cm){
        this.maxLengthHeight = 6;
        this.dbwForm.controls['noHeight'].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(6),
          MaxValidator.maxValueHeightCm
        ]);
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
      this.maxLengthHeight = 1;
      this.dbwForm.controls['noHeight'].setValidators([Validators.required,
        Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
        Validators.maxLength(1),
        MaxValidator.maxValueHeightFt
      ]);
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
        this.maxLengthWeight = 6;
        this.dbwForm.controls['noWeight'].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(6),
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
        this.maxLengthWeight = 7;
        this.dbwForm.controls['noWeight'].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(7),
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
    this.age = this.getAge();
    if(this.age<19){
      this.heightCard = false;
      this.dbwForm.controls['noHeight'].setValue(1);
      this.dbwForm.controls['noHeightIn'].setValue(0);
      this.dbwForm.controls['cmRange'].setValue(0)
      this.dbwForm.controls['ftRange'].setValue(0);
    }else if(this.age>=19){
      this.heightCard = true;
    }
    if(this.dbwForm.valid){
      if(this.dbwForm.value.noWeight!=0 && this.dbwForm.value.noHeight!=0 && this.dbwForm.value.birthDate!=0){
        this.classification = true;
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
        let age = this.getAge();
        let month = this.getMonth();
        let gender = this.dbwForm.value.gender;
        let p = Math.round(((height-100)*.1)*100)/100;
        let dbw = parseInt((Math.round(((height-100)-(p))*100)/100).toFixed(2));
        let dbwCut = dbw*0.1;
        let dbwMin = dbw-dbwCut;
        let dbwMax = dbw+dbwCut;
        if(age<10 && month>0){
          this.dbw = "";
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
          this.dbw = "";
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
          this.dbw = "Weight-for-age reference data are not available beyond age 10 because this indicator does not distinguish between height and body mass in an age period where many children are experiencing the pubertal growth spurt and may appear as having excess weight (by weight-for-age) when in fact they are just tall. - WHO";
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
            this.dbwStatus = "You need to gain more weight";
          }else if(weight>dbwMax){
            this.dbwNormal = false;
            this.dbwStatus = "You need to lessen your weight";
          }
        }
      }else{
        this.classification = false;
      }
    }else{
      this.classification = false;
    }
  }

}
