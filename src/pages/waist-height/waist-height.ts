import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaxValidator } from '../../validators/max';
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
  maxLengthHeight: number = 6;
  maxLengthHeightIn: number = 5;
  maxLengthWaist: number = 6;
  message: string = "Please complete the following inputs to compute your Waist-Height Ratio";
  result: boolean = false;
  formErrors = {
    'noHeight': [],
    'noHeightIn': [],
    'noWaist': [],
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
    'noWaist': {
      'required': 'Waist is required.',
      'maxlength': 'Waist cannot be more than '+ this.maxLengthWaist +' characters long.',
      'pattern': 'Waist must contain only valid values.',
      'exceed': 'Waist must not exceed the range values.',
      'less': 'Waist must not be less than the range values.'
    },
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController) {
  	this.waistHeightForm = formBuilder.group({
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
        waist: ['cm', Validators.compose([Validators.required])],
        noWaist: ['51', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
          MaxValidator.maxValueWaistCm
        ])],
        cmWaistRange: [''],
        inWaistRange: [''],
    });
    this.waistHeightForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.onValueChanged(data));
    this.waistHeightForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.getRatio());
  }

  onValueChanged(data?: any) {
    if (!this.waistHeightForm) { return; }
    const form = this.waistHeightForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.waistHeightForm[field] = '';
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

  cmWaistChange(){
    this.waistHeightForm.controls['noWaist'].setValue(this.waistHeightForm.value.cmWaistRange);
  }

  inWaistChange(){
    this.waistHeightForm.controls['noWaist'].setValue(this.waistHeightForm.value.inWaistRange);
  }

  waistUnitChange(){
    if(this.waistHeightForm.value.waist=="cm"){
      if(!this.cmWaist){
        this.cmWaist = true;
        this.in = false;
        this.maxLengthWaist = 6;
        this.waistHeightForm.controls["noWaist"].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(6),
          MaxValidator.maxValueWaistCm
        ]);
        let inConv = Math.round(eval(this.waistHeightForm.value.noWaist+'*'+2.54)*100)/100;
        this.waistHeightForm.controls['noWaist'].setValue(inConv);
        this.waistHeightForm.controls['cmWaistRange'].setValue(inConv);
      }
    }else{
      if(!this.in){
        this.cmWaist = false;
        this.in = true;
        this.maxLengthWaist = 5;
        this.waistHeightForm.controls["noWaist"].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(5),
          MaxValidator.maxValueWaistIn
        ]);
        let cmConv = Math.round(eval(this.waistHeightForm.value.noWaist+'/'+2.54)*100)/100;
        this.waistHeightForm.controls['noWaist'].setValue(cmConv);
        this.waistHeightForm.controls['inWaistRange'].setValue(cmConv);
      }
    }
  }

  heightTypeChange(){
    if(this.waistHeightForm.value.height=="cm"){
      if(!this.cmHeight){
        this.maxLengthHeight = 6;
        this.waistHeightForm.controls['noHeight'].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(6),
          MaxValidator.maxValueHeightCm
        ]);
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
      if(!this.ft){
        this.maxLengthHeight = 1;
        this.waistHeightForm.controls['noHeight'].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(1),
          MaxValidator.maxValueHeightFt
        ]);
        if(this.waistHeightForm.value.noHeight!=0){
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
        }else{
          this.waistHeightForm.controls['noHeight'].setValue(0);
          this.waistHeightForm.controls['noHeightIn'].setValue(0);
          this.waistHeightForm.controls['ftRange'].setValue(0);
        }
      }
      this.cmHeight = false;
      this.ft = true;
    }
  }

  getRatio(){
    if(this.waistHeightForm.valid){
      if(this.waistHeightForm.value.noHeight!=0){
        this.message = "";
        this.result = true;
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
      }else{
        this.message = "Please complete the following inputs to compute your Waist-Height Ratio";
        this.result = false;
      }
    }else{
      this.message = "Please complete the following inputs to compute your Waist-Height Ratio";
      this.result = false;
    }
  }

  convertToInch(val){
    val = (val=='') ? 0 : val;
    return Math.round(eval(val+'/'+2.54)*100)/100;
  }

  convertToCm(val){
    val = (val=='') ? 0 : val;
    return Math.round(eval(val+'*'+2.54)*100)/100;
  }

}
