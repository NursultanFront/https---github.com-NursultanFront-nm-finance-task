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

export function futureTimeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentTime = DateTime.now();

    if (control.value) {
      const inputTime = DateTime.fromISO(control.value);
      if (inputTime < currentTime) {
        return { invalidTime: 'Время не может быть ранее текущего времени.' };
      }
    }

    return null;
  };
}
