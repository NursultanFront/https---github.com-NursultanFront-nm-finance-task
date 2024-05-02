import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { TodoItem } from '../../interfaces/todo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatIconModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent implements OnInit {
  @Input({ required: true }) todo!: TodoItem;

  constructor() {}

  ngOnInit() {}
}
