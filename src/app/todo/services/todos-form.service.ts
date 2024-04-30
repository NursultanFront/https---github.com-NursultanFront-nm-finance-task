import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable()
export class TodoFormService {
  constructor(private fb: FormBuilder) {}

  futureDateValidator() {
    return (control: FormControl): { [key: string]: any } | null => {
      const date = new Date(control.value);
      const currentDate = new Date();
      return date >= currentDate ? null : { pastDate: true };
    };
  }

  getTodoFormGroup() {
    return this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      expirationDate: ['', Validators.required, this.futureDateValidator()],
      expirationTime: [''],
    });
  }
}
