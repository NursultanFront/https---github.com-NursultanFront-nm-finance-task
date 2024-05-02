import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { TodoService } from '../../services/todo.service';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoItem } from '../../interfaces/todo.interface';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list-container',
  templateUrl: './todo-list-container.component.html',
  styleUrls: ['./todo-list-container.component.scss'],
  providers: [TodoService],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TodoCardComponent, MatListModule, MatExpansionModule],
})
export class TodoListContainerComponent implements OnInit {
  panelOpenState = false;

  todos$: Observable<TodoItem[]>;

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.todos$;
  }

  ngOnInit() {}
}
