import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaxValidator } from '../../validators/max';

@Component({
  selector: 'page-energy-requirement',
  templateUrl: 'energy-requirement.html'
})
export class EnergyRequirementPage {

  energyForm: FormGroup;
  macroForm: FormGroup;
  //units
  cm: boolean = true;
	ft: boolean;
  maxLengthHeight: number = 6;
  maxLengthHeightIn: number = 5;
  macroRange: boolean = false;
  //energy
  minProtein: number = 6;
  maxProtein: number = 15;
  minFat: number = 25;
  maxFat: number = 35;
  minCarb: number = 50;
  maxCarb: number = 69;
  protein: number = 15;
  fat: number = 30;
  carb: number = 55;
  proteinReset: number;
  fatReset: number;
  carbReset: number;
  proteinG: number;
  fatG: number;
  carbG: number;
  macroPercent: number = 100;
  //output
  result: boolean = true;
  kcal: number =  620;
  message : string = "Please complete the following inputs to compute your Energy Requirement";
  formErrors = {
    'noWeight': [],
    'noHeight': [],
    'noHeightIn': [],
    'noWaist': [],
    'noHip': [],
  };
  validationMessages = {
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
    },
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public formBuilder:FormBuilder) {
    this.energyForm = formBuilder.group({
      gender: ['M', Validators.compose([Validators.required])],
      ageRange: ['1', Validators.compose([Validators.required])],
      activity: ['30', Validators.compose([Validators.required])],
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
    this.macroForm = formBuilder.group({
      proteinRange: [this.protein],
      fatRange: [this.fat],
      carbRange: [this.carb],
    });
    this.submit();
    this.energyForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.onValueChanged(data));
    this.energyForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.submit());
    this.macroForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.computePercent());
  }

  onValueChanged(data?: any) {
    if (!this.energyForm) { return; }
    const form = this.energyForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.energyForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnergyRequirementPage');
  }

  macro(){
    if(!this.macroRange){
      this.proteinReset = this.protein;
      this.fatReset = this.fat;
      this.carbReset = this.carb;
    }
    this.macroRange = (this.macroRange) ? false : true;
  }

  reset(){
    this.macroForm.controls['proteinRange'].setValue(this.proteinReset);
    this.macroForm.controls['fatRange'].setValue(this.fatReset);
    this.macroForm.controls['carbRange'].setValue(this.carbReset);
    this.protein = this.proteinReset;
    this.fat = this.fatReset;
    this.carb = this.carbReset;
    this.computePercent();
  }

  computePercent(){
    this.macroPercent = this.protein + this.fat + this.carb;
  }

  proteinChange(){
    this.protein = this.macroForm.value.proteinRange;
    let proteinG = (this.kcal*(this.protein/100))/4;
    this.proteinG = Math.round(proteinG/5)*5;
  }
  fatChange(){
    this.fat = this.macroForm.value.fatRange;
    let fatG = (this.kcal*(this.fat/100))/9;
    this.fatG = Math.round(fatG/5)*5;
  }

  carbChange(){
    this.carb = this.macroForm.value.carbRange;
    let carbG = (this.kcal*(this.carb/100))/4;
    this.carbG = Math.round(carbG/5)*5;
  }

  cmHeightChange(){
    this.energyForm.controls['noHeight'].setValue(this.energyForm.value.cmRange);
  }

  ftHeightChange(){
    this.energyForm.controls['noHeight'].setValue(this.energyForm.value.ftRange);
  }

  setHeightRange(){
    if(this.energyForm.value.height=="cm"){
      this.energyForm.controls['cmRange'].setValue(this.energyForm.value.noHeight);
    }else{
      this.energyForm.controls['ftRange'].setValue(this.energyForm.value.noHeight);
    }
  }

  heightTypeChange(){
    if(this.energyForm.value.height=="cm"){
      if(!this.cm){
        this.maxLengthHeight = 6;
        this.energyForm.controls['noHeight'].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(6),
          MaxValidator.maxValueHeightCm
        ]);
        let feet = this.energyForm.value.noHeight*12;
        let inch = this.energyForm.value.noHeightIn;
        if(inch=='' || inch==null){
          inch = 0;
        }
        let toInch = eval(feet+"+"+inch);
        let cm = Math.round((toInch*2.54)*100)/100;
        this.energyForm.controls['noHeight'].setValue(cm);
        this.energyForm.controls['cmRange'].setValue(cm);
      }
      this.cm = true;
      this.ft = false;
    }else{
      if(!this.ft){
        this.maxLengthHeight = 1;
        this.energyForm.controls['noHeight'].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(1),
          MaxValidator.maxValueHeightFt
        ]);
        if(this.energyForm.value.noHeight!=0){
          let computedHeight = Math.round((this.energyForm.value.noHeight/2.54)*100)/100;
          let toInch = Math.round((computedHeight/12)*100)/100;
          let height = toInch.toString().split(".");
          if(height[1]=="" || height[1]==null){
            height[1] = "0";
          }
          let feet = height[0];
          let inch = Math.round((eval(("0."+height[1])+"*"+12))*100)/100;
          this.energyForm.controls['noHeight'].setValue(feet);
          this.energyForm.controls['noHeightIn'].setValue(inch);
          this.energyForm.controls['ftRange'].setValue(feet);
        }else{
          this.energyForm.controls['noHeight'].setValue(0);
          this.energyForm.controls['noHeightIn'].setValue(0);
          this.energyForm.controls['ftRange'].setValue(0);
        }
      }
      this.cm = false;
      this.ft = true;
    }
  }

  submit(){
    if(this.energyForm.valid){
      this.result = true;
      if(this.energyForm.value.ageRange>7){
        this.energyForm.value.noHeight = 0;
        this.energyForm.value.noHeightFt = 0;
        this.energyForm.value.noHeightIn = 0;
        this.energyForm.controls['cmRange'].setValue(0);
        this.energyForm.controls['ftRange'].setValue(0);
      }
      if(this.energyForm.value.ageRange==1){
        this.kcal = (this.energyForm.value.gender=='M') ? 1000 : 920;
        this.minProtein = 6; this.maxProtein = 15;
        this.minFat = 25; this.maxFat = 35;
        this.minCarb = 50; this.maxCarb = 69;
        this.protein = 15; this.fat = 30; this.carb = 55;
      }else if(this.energyForm.value.ageRange==2){
        this.kcal = (this.energyForm.value.gender=='M') ? 1350 : 1260;
        this.minProtein = 6; this.maxProtein = 15;
        this.minFat = 15; this.maxFat = 30;
        this.minCarb = 55; this.maxCarb = 79;
        this.protein = 15; this.fat = 20; this.carb = 65;
      }else if(this.energyForm.value.ageRange==3){
        this.kcal = (this.energyForm.value.gender=='M') ? 1600 : 1470;
        this.minProtein = 6; this.maxProtein = 15;
        this.minFat = 15; this.maxFat = 30;
        this.minCarb = 55; this.maxCarb = 79;
        this.protein = 15; this.fat = 20; this.carb = 65;
      }else if(this.energyForm.value.ageRange==4){
        this.kcal = (this.energyForm.value.gender=='M') ? 2060 : 1980;
        this.minProtein = 6; this.maxProtein = 15;
        this.minFat = 15; this.maxFat = 30;
        this.minCarb = 55; this.maxCarb = 79;
        this.protein = 15; this.fat = 20; this.carb = 65;
      }else if(this.energyForm.value.ageRange==5){
        this.kcal = (this.energyForm.value.gender=='M') ? 2700 : 2170;
        this.minProtein = 6; this.maxProtein = 15;
        this.minFat = 15; this.maxFat = 30;
        this.minCarb = 55; this.maxCarb = 79;
        this.protein = 15; this.fat = 20; this.carb = 65;
      }else if(this.energyForm.value.ageRange==6){
        this.kcal = (this.energyForm.value.gender=='M') ? 3010 : 2280;
        this.minProtein = 6; this.maxProtein = 15;
        this.minFat = 15; this.maxFat = 30;
        this.minCarb = 55; this.maxCarb = 79;
        this.protein = 15; this.fat = 20; this.carb = 65;
      }else{
        this.minProtein = 10; this.maxProtein = 15;
        this.minFat = 15; this.maxFat = 30;
        this.minCarb = 55; this.maxCarb = 75;
        this.protein = 15; this.fat = 20; this.carb = 65;
        this.result = (this.energyForm.value.noHeight!=0) ? true : false;
        if(this.result){
          let height = 0;
          if(this.ft){
            let feet = this.energyForm.value.noHeight*12;
            let inch = this.energyForm.value.noHeightIn;
            if(inch=='' || inch==null){
              inch = 0;
            }
            let toInch = eval(feet+"+"+inch);
            height = Math.round((toInch*2.54)*100)/100;
          }else{
            height = this.energyForm.value.noHeight;
          }
          let activity = this.energyForm.value.activity;
          let p = Math.round(((height-100)*.1)*100)/100;
          let dbw = parseInt((Math.round(((height-100)-(p))*100)/100).toFixed(2));
          let kcal = dbw*activity;
          if(kcal % 50 < 25){
            kcal -= (kcal % 50);
          }
          else if(kcal % 50 > 25){
            kcal += (50 - (kcal % 50));
          }
          else if(kcal % 50 == 25){
            kcal += 25;
          }
          this.kcal = kcal;
        }//check if valid 
      }
      // this.proteinG = Math.round(((this.kcal*(this.protein/100))/4)*100)/100;
      // this.fatG = Math.round(((this.kcal*(this.fat/100))/9)*100)/100;
      // this.carbG = Math.round(((this.kcal*(this.carb/100))/4)*100)/100;
      this.macroForm.controls['proteinRange'].setValue(this.protein);
      this.macroForm.controls['fatRange'].setValue(this.fat);
      this.macroForm.controls['carbRange'].setValue(this.carb);
      let proteinG = (this.kcal*(this.protein/100))/4;
      let fatG = (this.kcal*(this.fat/100))/9;
      let carbG = (this.kcal*(this.carb/100))/4;
      this.proteinG = Math.round(proteinG/5)*5;
      this.fatG = Math.round(fatG/5)*5;
      this.carbG = Math.round(carbG/5)*5;
    }else{
      this.result = false;
    }
  }
}//end of class