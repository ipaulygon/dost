import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SQLite } from 'ionic-native';

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
  submitAttempt : boolean = false;
  kilo : boolean = true;
  pound : boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,) {
    this.bmiForm = formBuilder.group({
        gender: ['', Validators.compose([Validators.required])],
        birth: ['', Validators.compose([Validators.required])],
        weight: ['kg', Validators.compose([Validators.required])],
        noWeight: ['0', Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BmiPage');
  }

  weightChange(){
    if(this.bmiForm.value.weight=="kg"){
      this.kilo = true;
      this.pound = false;
    }else{
      this.kilo = false;
      this.pound = true;
    }
  }

}
