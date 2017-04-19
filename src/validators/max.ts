import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
 
export class MaxValueValidator {
    static isValidKg(control: FormGroup): any {
        console.log("kilo");
    }

    static isValidLb(control: FormGroup): any {
        console.log("lb");
    }
}