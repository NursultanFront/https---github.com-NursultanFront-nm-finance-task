import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NgxMaterialTimepickerModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTodoComponent implements OnInit {
  ngOnInit() {}
}
