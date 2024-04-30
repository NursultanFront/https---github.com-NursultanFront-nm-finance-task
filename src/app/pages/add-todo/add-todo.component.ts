import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateTodoComponent } from '../../todo/components/create-edit-todo/create-edit-todo.component';
import { TodoFormService } from '../../todo/services/todos-form.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, CreateTodoComponent],
  providers: [TodoFormService],
})
export class AddTodoComponent implements OnInit {
  ngOnInit() {}
}
