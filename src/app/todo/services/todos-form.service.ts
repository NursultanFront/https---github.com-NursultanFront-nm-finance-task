import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  asyncFutureDateValidator,
  futureTimeValidator,
} from './todos-form.validators';

@Injectable()
export class TodoFormService {
  constructor(private fb: FormBuilder) {}

  getTodoFormGroup() {
    return this.fb.nonNullable.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      expirationDate: ['', [Validators.required], [asyncFutureDateValidator()]],
      expirationTime: ['', [Validators.required, futureTimeValidator()]],
    });
  }
}
