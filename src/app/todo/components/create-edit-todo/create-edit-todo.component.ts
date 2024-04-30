import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TodoFormService } from '../../services/todos-form.service';

import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormFieldErrorsComponent } from '../../../shared/components/errors/form-field-errors.component';

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
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormFieldErrorsComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [TodoFormService, provideNativeDateAdapter()],
})
export class CreateTodoComponent implements OnInit {
  readonly todoForm = this.todoFormService.getTodoFormGroup();

  constructor(private readonly todoFormService: TodoFormService) {}

  getFormControl(fieldName: string): FormControl {
    return this.todoForm.get(fieldName) as FormControl;
  }

  ngOnInit(): void {
    this.getFormControl('expirationTime').valueChanges.subscribe((ress) =>
      console.log(ress)
    );
  }

  ngDoCheck() {
    this.getFormControl('expirationTime');
  }

  onSubmit() {}
}
