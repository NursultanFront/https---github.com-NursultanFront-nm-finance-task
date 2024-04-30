import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TodoFormService } from '../../services/todos-form.service';

import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormFieldErrorsComponent } from '../../../shared/components/errors/form-field-errors.component';

@Component({
  selector: 'app-create-todos',
  templateUrl: './create-edit-todo.component.html',
  styleUrls: ['./create-edit-todo.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormFieldErrorsComponent,
    ReactiveFormsModule,
  ],
})
export class CreateTodoComponent {
  readonly todoForm = this.todoFormService.getTodoFormGroup();

  constructor(private readonly todoFormService: TodoFormService) {}

  getFormControl(fieldName: string): FormControl {
    return this.todoForm.get(fieldName) as FormControl;
  }

  onSubmit() {}
}
