import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaxValidator } from '../../validators/max';

@Component({
  selector: 'page-waist-circumference',
  templateUrl: 'waist-circumference.html'
})
export class WaistCircumferencePage {
  waistForm: FormGroup;
  riskIsLow: boolean = true;
  cutOff : number = 94;
  waistCm: boolean = true;
	waistIn: boolean;
  maxLengthWaist: number = 6;
  message: string = "Please complete the following inputs to compute your Waist Circumference status";
  classification: boolean = false;
  formErrors = {
    'noWaist': [],
  };

  validationMessages = {
    'noWaist': {
      'required': 'Waist is required.',
      'maxlength': 'Waist cannot be more than '+ this.maxLengthWaist +' characters long.',
      'pattern': 'Waist must contain only valid values.',
      'exceed': 'Waist must not exceed the range values.',
      'less': 'Waist must not be less than the range values.'
    },
  }
  constructor(public alertctrl:AlertController,public formBuilder:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.waistForm = formBuilder.group({
      gender: ['M', Validators.compose([Validators.required])],
      waist: ['cm', Validators.compose([Validators.required])],
      noWaist: ['0', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
        Validators.required,
        Validators.maxLength(6),
        MaxValidator.maxValueWaistCm
      ])],
      cmWaistRange: [''],
      inWaistRange: [''],
    });
    this.waistForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.onValueChanged(data));
    this.waistForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.submit());
  }

  onValueChanged(data?: any) {
    if (!this.waistForm) { return; }
    const form = this.waistForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.waistForm[field] = '';
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
    console.log('ionViewDidLoad WaistCircumferencePage');
  }

  cmWaistChange(){
    this.waistForm.controls['noWaist'].setValue(this.waistForm.value.cmWaistRange);
  }

  inWaistChange(){
    this.waistForm.controls['noWaist'].setValue(this.waistForm.value.inWaistRange);
  }

  setWaistRange(){
    if(this.waistForm.value.waist=="cm"){
      this.waistForm.controls['cmWaistRange'].setValue(this.waistForm.value.noWaist);
    }else{
      this.waistForm.controls['inWaistRange'].setValue(this.waistForm.value.noWaist);
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

  waistUnitChange(){
    if(this.waistForm.value.waist=="cm"){
      if(!this.waistCm){
        this.waistCm = true;
        this.waistIn = false;
        this.maxLengthWaist = 6;
        this.waistForm.controls["noWaist"].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(6),
          MaxValidator.maxValueWaistCm
        ]);
        let inConv = this.convertToCm(this.waistForm.value.noWaist);
        this.waistForm.controls['noWaist'].setValue(inConv);
        this.waistForm.controls['cmWaistRange'].setValue(inConv);
      }
    }else{
      if(!this.waistIn){
        this.waistCm = false;
        this.waistIn = true;
        this.maxLengthWaist = 6;
        this.waistForm.controls["noWaist"].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(6),
          MaxValidator.maxValueWaistIn
        ]);
        let cmConv = this.convertToInch(this.waistForm.value.noWaist);
        this.waistForm.controls['noWaist'].setValue(cmConv);
        this.waistForm.controls['inWaistRange'].setValue(cmConv);
      }
    }
  }

  submit(){
    if(this.waistForm.valid){
      if(this.waistForm.value.noWaist!=0){
        this.classification = true;
        this.message = "";
        if(this.waistForm.value.gender=='M'){
          this.cutOff = 94;
        }else{
          this.cutOff = 80;
        }
        if(this.waistCm){
          this.riskIsLow = (this.waistForm.value.noWaist >= this.cutOff)? false : true;
        }else{
          let convertedWaist = this.convertToCm(this.waistForm.value.noWaist);
          this.riskIsLow = (convertedWaist >= this.cutOff)? false : true;
        }
      }
    }else{
      this.riskIsLow = true;
      this.classification = false;
      this.message = "Please complete the following inputs to compute your Waist Circumference status";
    }
  }
}
