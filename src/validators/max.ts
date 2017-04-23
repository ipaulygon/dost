import { FormControl } from '@angular/forms';
 
export class MaxValidator {

    static maxBirth(control: FormControl): any {
        let today = new Date();
        let birth = new Date(control.value)
        if(birth > today){
            return {exceed: true};
        }
        return null;
    }
 
    static maxValueKg(control: FormControl): any {
        if(control.value > 635){
            return {exceed: true};
        }
        if(control.value < 0){
            return {less: true};
        }
        return null;
    }

    static maxValueLb(control: FormControl): any {
        if(control.value > 1400){
            return {exceed: true};
        }
        if(control.value < 0){
            return {less: true};
        }
        return null;
    }

    static maxValueHeightCm(control: FormControl): any {
        if(control.value > 275){
            return {exceed: true};
        }
        if(control.value < 0){
            return {less: true};
        }
        return null;
    }

    static maxValueHeightFt(control: FormControl): any {
        if(control.value > 9){
            return {exceed: true};
        }
        if(control.value < 0){
            return {less: true};
        }
        return null;
    }

    static maxValueHeightIn(control: FormControl): any {
        if(control.value >= 12){
            return {exceed: true};
        }
        if(control.value < 0){
            return {less: true};
        }
        return null;
    }

    static maxValueWaistCm(control: FormControl): any {
        if(control.value > 303){
            return {exceed: true};
        }
        if(control.value < 0){
            return {less: true};
        }
        return null;
    }

    static maxValueWaistIn(control: FormControl): any {
        if(control.value > 119){
            return {exceed: true};
        }
        if(control.value < 0){
            return {less: true};
        }
        return null;
    }

    static maxValueHipCm(control: FormControl): any {
        if(control.value > 245){
            return {exceed: true};
        }
        if(control.value < 0){
            return {less: true};
        }
        return null;
    }

    static maxValueHipIn(control: FormControl): any {
        if(control.value > 96){
            return {exceed: true};
        }
        if(control.value < 0){
            return {less: true};
        }
        return null;
    }
 
}