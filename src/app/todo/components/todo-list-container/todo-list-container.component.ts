import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list-container',
  templateUrl: './todo-list-container.component.html',
  styleUrls: ['./todo-list-container.component.scss'],
  providers: [TodoService],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListContainerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
