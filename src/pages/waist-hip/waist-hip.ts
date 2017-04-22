import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaxValidator } from '../../validators/max';
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
  maxLengthHip: number = 6;
  maxLengthWaist: number = 6;
  message: string = "Please complete the following inputs to compute your Waist-Hip Ratio";
  result: boolean = false;
  formErrors = {
    'noWaist': [],
    'noHip': [],
  };

  validationMessages = {
    'noWaist': {
      'required': 'Waist is required.',
      'maxlength': 'Waist cannot be more than '+ this.maxLengthWaist +' characters long.',
      'pattern': 'Waist must contain only valid values.',
      'exceed': 'Waist must not exceed the range values.',
      'less': 'Waist must not be less than the range values.'
    },
    'noHip': {
      'required': 'Hip is required.',
      'maxlength': 'Hip cannot be more than '+ this.maxLengthHip +' characters long.',
      'pattern': 'Hip must contain only valid values.',
      'exceed': 'Hip must not exceed the range values.',
      'less': 'Hip must not be less than the range values.'
    },
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController) {
    this.waistHipForm = formBuilder.group({
    	gender: ['M', Validators.compose([Validators.required])],
      waist: ['cm', Validators.compose([Validators.required])],
        noWaist: ['51', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
          MaxValidator.maxValueWaistCm
        ])],
        hip: ['cm', Validators.compose([Validators.required])],
        noHip: ['51', Validators.compose([Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),
          Validators.required,
          Validators.maxLength(6),
          MaxValidator.maxValueHipCm
        ])],
        cmWaistRange: [''],
        inWaistRange: [''],
        cmHipRange: [''],
        inHipRange: [''],       
    });
    this.waistHipForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.onValueChanged(data));
    this.waistHipForm.valueChanges
		.debounceTime(100)
		.subscribe(data => this.getRatio());
  }

  onValueChanged(data?: any) {
    if (!this.waistHipForm) { return; }
    const form = this.waistHipForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.waistHipForm[field] = '';
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
    console.log('ionViewDidLoad WaistHipPage');
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
  }

  setHipRange(){
    if(this.waistHipForm.value.hip=="cm"){
      this.waistHipForm.controls['cmHipRange'].setValue(this.waistHipForm.value.noHip);
    }else{
      this.waistHipForm.controls['inHipRange'].setValue(this.waistHipForm.value.noHip);
    }
  }

  getRatio(){
    if(this.waistHipForm.valid){
      this.result = true;
      this.message = "";
      let waist = (this.waistHipForm.value.waist == 'cm') ? this.waistHipForm.value.noWaist : this.convertToCm(this.waistHipForm.value.noWaist);
      let hip = (this.waistHipForm.value.hip == 'cm') ? this.waistHipForm.value.noHip : this.convertToCm(this.waistHipForm.value.noHip);
      this.ratio = Math.round(eval(waist + '/' + hip)*100)/100;
      if((this.ratio >= 0.90) && (this.waistHipForm.value.gender == 'M')){
        this.isOnRisk = true;
      }else if((this.ratio >= 0.85) && (this.waistHipForm.value.gender == 'F')){
        this.isOnRisk = true;
      }else{
        this.isOnRisk = false;
      }
    }else{
      this.message = "Please complete the following inputs to compute your Waist-Hip Ratio";
      this.result = false;
    }
  }

  waistUnitChange(){
    if(this.waistHipForm.value.waist=="cm"){
      if(!this.cmWaist){
        this.cmWaist = true;
        this.inWaist = false;
        this.maxLengthWaist = 6;
        this.waistHipForm.controls["noWaist"].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(6),
          MaxValidator.maxValueWaistCm
        ]);
        let inConv = Math.round(eval(this.waistHipForm.value.noWaist+'*'+2.54)*100)/100;
        this.waistHipForm.controls['noWaist'].setValue(inConv);
        this.waistHipForm.controls['cmWaistRange'].setValue(inConv);
      }
    }else{
      if(!this.inWaist){
        this.cmWaist = false;
        this.inWaist = true;
        this.maxLengthWaist = 5;
        this.waistHipForm.controls["noWaist"].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(5),
          MaxValidator.maxValueWaistIn
        ]);
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
        this.maxLengthHip = 6;
        this.waistHipForm.controls["noHip"].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(6),
          MaxValidator.maxValueHipCm
        ]);
        let cmConv = this.convertToCm(this.waistHipForm.value.noHip);
        this.waistHipForm.controls['noHip'].setValue(cmConv);
        this.waistHipForm.controls['cmHipRange'].setValue(cmConv);
      }
    }else{
      if(!this.inHip){
        this.cmHip = false;
        this.inHip = true;
        this.maxLengthHip = 5;
        this.waistHipForm.controls["noHip"].setValidators([Validators.required,
          Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), 
          Validators.maxLength(5),
          MaxValidator.maxValueHipIn
        ]);
        let inConv = this.convertToInch(this.waistHipForm.value.noHip);
        this.waistHipForm.controls['noHip'].setValue(inConv);
        this.waistHipForm.controls['inHipRange'].setValue(inConv);
      }
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
