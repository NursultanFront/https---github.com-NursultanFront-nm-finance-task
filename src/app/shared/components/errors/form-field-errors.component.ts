import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-errors',
  templateUrl: './form-field-errors.component.html',
  styleUrls: ['./form-field-errors.component.scss'],
  imports: [MatFormFieldModule, NgSwitchCase, NgIf, NgSwitch],
  standalone: true,
})
export class FormFieldErrorsComponent {
  @Input() field?: FormControl;

  get fieldErrors(): ValidationErrors | null {
    return this.field?.errors ?? null;
  }
}
