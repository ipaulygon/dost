import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaxValidator } from '../../validators/max';

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
  kilo : boolean = true;
  pound : boolean = false;
  cm : boolean = true;
  ft : boolean = false;
  background : boolean = true;
  message : string = "Please complete the following inputs to compute your BMI";
  status : any;
  abnormal : boolean = false;
  normal : boolean = false;
  classification: boolean = false;
  maxLengthWeight: number =  6;
  maxLengthHeight: number = 6;
  maxLengthHeightIn: number = 5;
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController, public storage: Storage) {
    this.bmiForm = formBuilder.group({
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
    this.bmiForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.onValueChanged(data));
    this.bmiForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.submit());
  }

  onValueChanged(data?: any) {
    if (!this.bmiForm) { return; }
    const form = this.bmiForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.bmiForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
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
    if(this.cm){
      this.bmiForm.controls['cmRange'].setValue(this.bmiForm.value.noHeight);
    }else{
      this.bmiForm.controls['ftRange'].setValue(this.bmiForm.value.noHeight);
    }
  }

  weightTypeChange(){
    if(this.bmiForm.value.weight=="kg"){
      if(!this.kilo){
        this.maxLengthWeight = 6;
        this.bmiForm.controls['noWeight'].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(6),
          MaxValidator.maxValueKg
        ]);
        let convertedWeight = Math.round((this.bmiForm.value.noWeight/2.2)*10)/10;
        this.bmiForm.controls['noWeight'].setValue(convertedWeight);
        this.bmiForm.controls['kiloRange'].setValue(convertedWeight);
      }
      this.kilo = true;
      this.pound = false;
    }else{
      if(!this.pound){
        this.maxLengthWeight = 7;
        this.bmiForm.controls['noWeight'].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(7),
          MaxValidator.maxValueLb
        ]);
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
        this.maxLengthHeight = 6;
        this.bmiForm.controls['noHeight'].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(6),
          MaxValidator.maxValueHeightCm
        ]);
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
      if(!this.ft){
        this.maxLengthHeight = 1;
        this.bmiForm.controls['noHeight'].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(1),
          MaxValidator.maxValueHeightFt
        ]);
        if(this.bmiForm.value.noHeight!=0){
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
        }else{
          this.bmiForm.controls['noHeight'].setValue(0);
          this.bmiForm.controls['noHeightIn'].setValue(0);
          this.bmiForm.controls['ftRange'].setValue(0);
        }
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
      if(this.bmiForm.value.noWeight!=0 && this.bmiForm.value.noHeight!=0 && this.bmiForm.value.birthDate!=0){
        this.classification = true;
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
        let gender = this.bmiForm.value.gender;
        //start BMI
        let bmi = Math.round((weight/(height*height))*100)/100;
        this.message = "Your BMI is " + bmi + " kg/m²";
        if(age<=18 && month>0){
          this.storage.get('bmi'+gender+age.toString()+month.toString()).then((val)=>{
            if(bmi<val[0]){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi>=val[0] && bmi<val[1]){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi>=val[1] && bmi<val[5]){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi>=val[5] && bmi<val[6]){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi>=val[6]){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          });
        }else if(age<=19 && month==0){
          this.storage.get('bmi'+gender+age.toString()).then((val)=>{
            if(bmi<val[0]){
              this.abnormal = true; this.normal = false; this.status = "SEVERE THINNESS";
            }else if(bmi>=val[0] && bmi<val[1]){
              this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
            }else if(bmi>=val[1] && bmi<val[5]){
              this.abnormal = false; this.normal = true; this.status = "NORMAL";
            }else if(bmi>=val[5] && bmi<val[6]){
              this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
            }else if(bmi>=val[6]){
              this.abnormal = true; this.normal = false; this.status = "OBESE";
            }
          });
        }else{
          if(bmi<18.5){
            this.abnormal = true; this.normal = false; this.status = "UNDERWEIGHT";
          }else if(bmi>=18.5 && bmi<25){
            this.abnormal = false; this.normal = true; this.status = "NORMAL";
          }else if(bmi>=25 && bmi<30){
            this.abnormal = true; this.normal = false; this.status = "OVERWEIGHT";
          }else if(bmi>=30){
            this.abnormal = true; this.normal = false; this.status = "OBESE";
          }
        }
      }else{
        this.classification = false;
        this.message = "Please complete the following inputs to compute your BMI";
      }
    }else{
      this.classification = false;
      this.message = "Please complete the following inputs to compute your BMI";
    }
  }

}
