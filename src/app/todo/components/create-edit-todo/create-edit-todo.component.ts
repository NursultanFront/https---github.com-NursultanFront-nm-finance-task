import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FormFieldErrorsComponent } from '../../../shared/components/errors/form-field-errors.component';
import { TodoFormService } from '../../services/todos-form.service';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../../interfaces/todo.interface';
import { Locker } from '../../../core/common/locker';

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
  public locker = new Locker();

  constructor(
    private readonly todoSevice: TodoService,
    private readonly todoFormService: TodoFormService,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef
  ) {}

  getFormControl(fieldName: string): FormControl {
    return this.todoForm.get(fieldName) as FormControl;
  }

  onSubmit() {
    const newTodo: TodoItem = {
      title: this.getFormControl('title').value,
      expirationDate: new Date(
        this.getFormControl('expirationDate').value
      ).getTime(),
      expirationTime: this.getFormControl('expirationTime').value,
      createdAt: Date.now(),
      id: Date.now(),
      isFavorite: false,
      done: false,
    };

    this.todoSevice
      .addTodo(newTodo)
      .pipe(this.locker.rxPipe(), takeUntilDestroyed(this.destroyRef))
      .subscribe((sucess) => {
        if (sucess) {
          this.todoForm.reset();
        }
      });
  }

  onBackOnFolders() {
    this.router.navigate(['/']);
  }

  clearField(fieldName: string): void {
    this.getFormControl(fieldName).reset();
  }
}
