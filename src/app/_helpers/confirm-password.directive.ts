import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validators} from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmPasswordDirective,
    multi: true
  }]
})
export class ConfirmPasswordDirective implements Validators {

  @Input() appConfirmPassword: string | undefined;

  validate(control: AbstractControl): { [key: string]: any } | null {
    // @ts-ignore
    const controlToCompare = control.parent.get(this.appConfirmPassword);
    if (controlToCompare && controlToCompare.value !== control.value) {
      return {'notEqual': true};
    }

    return null;
  }

}
