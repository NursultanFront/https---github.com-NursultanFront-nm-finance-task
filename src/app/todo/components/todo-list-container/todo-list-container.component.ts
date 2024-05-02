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
import { Locker } from '../../../core/common/locker';

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
  public readonly locker = new Locker();
  public panelOpenState = false;
  todayTodos$: Observable<TodoItem[]>;
  otherTodos$: Observable<TodoItem[]>;

  constructor(private todoService: TodoService) {
    this.todayTodos$ = this.todoService.getTodayTodos();
    this.otherTodos$ = this.todoService.getOtherTodos();
  }

  // public deleteTodo(id: number) {
  //   console.log(id);
  //   console.log('sdawds');
  //   this.todoService.removeTodo(id).subscribe();
  // }

  public handleDeleteItem(id: number): void {
    this.todoService.removeTodo(id).pipe(this.locker.rxPipe()).subscribe();
  }

  ngOnInit() {}
}
