import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatIconModule } from '@angular/material/icon';

import { FormFieldErrorsComponent } from '../../../shared/components/errors/form-field-errors.component';
import { TodoFormService } from '../../services/todos-form.service';

@Component({
  selector: 'app-create-todos',
  templateUrl: './create-edit-todo.component.html',
  styleUrls: ['./create-edit-todo.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    FormFieldErrorsComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [TodoFormService, provideNativeDateAdapter()],
})
export class CreateTodoComponent {
  readonly todoForm = this.todoFormService.getTodoFormGroup();

  constructor(
    private readonly todoFormService: TodoFormService,
    private readonly router: Router
  ) {}

  getFormControl(fieldName: string): FormControl {
    return this.todoForm.get(fieldName) as FormControl;
  }

  onSubmit() {
    console.log('click');
    console.log(this.todoForm.value);
  }

  onBackOnFolders() {
    this.router.navigate(['/']);
  }
}
