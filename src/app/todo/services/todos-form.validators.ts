import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DateTime } from 'luxon';

export function asyncFutureDateValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const inputDate = new Date(control.value);
    const currentDate = new Date();

    inputDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    return of(inputDate >= currentDate ? null : { pastDate: true });
  };
}

export function timeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateControl = control.root.get('expirationDate');
    if (!dateControl || !dateControl.value || !control.value) {
      return null;
    }

    const currentDate = new Date();
    const expirationDate = new Date(dateControl.value);
    const expirationTimeParts = control.value.split(':');
    const expirationTime = new Date(expirationDate.getTime());

    if (expirationTimeParts.length === 2) {
      expirationTime.setHours(
        parseInt(expirationTimeParts[0]),
        parseInt(expirationTimeParts[1]),
        0,
        0
      );
    }

    const currentZeroTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    if (expirationDate.toDateString() === currentZeroTime.toDateString()) {
      if (expirationTime < currentDate) {
        return { invalidTime: true };
      }
    }

    return null;
  };
}
