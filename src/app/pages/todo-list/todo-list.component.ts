import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TodoListContainerComponent } from '../../todo/components/todo-list-container/todo-list-container.component';
import { TodoService } from '../../todo/services/todo.service';
import { TodoItem } from '../../todo/interfaces/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  imports: [TodoListContainerComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {}
