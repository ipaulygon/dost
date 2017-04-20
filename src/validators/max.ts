import { FormControl } from '@angular/forms';
 
export class MaxValidator {
 
    static maxValueKg(control: FormControl): any {
        if(control.value > 635){
            return "exceed";
        }
        if(control.value < 0){
            return "less";
        }
        return null;
    }

    static maxValueLb(control: FormControl): any {
        if(control.value > 1400){
            return "exceed";
        }
        if(control.value < 0){
            return "less";
        }
        return null;
    }

    static maxValueHeightCm(control: FormControl): any {
        if(control.value > 275){
            return "exceed";
        }
        if(control.value < 0){
            return "less";
        }
        return null;
    }

    static maxValueHeightFt(control: FormControl): any {
        if(control.value > 9){
            return "exceed";
        }
        if(control.value < 0){
            return "less";
        }
        return null;
    }

    static maxValueHeightIn(control: FormControl): any {
        if(control.value >= 12){
            return "exceed";
        }
        if(control.value < 0){
            return "less";
        }
        return null;
    }

    static maxValueWaistCm(control: FormControl): any {
        if(control.value > 180){
            return "exceed";
        }
        if(control.value < 51){
            return "less";
        }
        return null;
    }

    static maxValueWaistIn(control: FormControl): any {
        if(control.value > 71){
            return "exceed";
        }
        if(control.value < 20){
            return "less";
        }
        return null;
    }

    static maxValueHipCm(control: FormControl): any {
        if(control.value > 180){
            return "exceed";
        }
        if(control.value < 51){
            return "less";
        }
        return null;
    }

    static maxValueHipIn(control: FormControl): any {
        if(control.value > 71){
            return "exceed";
        }
        if(control.value < 20){
            return "less";
        }
        return null;
    }
 
}