import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodoService } from '../../services/todo.service';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoItem } from '../../interfaces/todo.interface';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Locker } from '../../../core/common/locker';
import { ActivatedRoute } from '@angular/router';

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
  public todayTodos$!: Observable<TodoItem[]>;
  public todos$!: Observable<TodoItem[]>;
  public isFavoriteView: boolean = false;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private readonly destroyRef: DestroyRef
  ) {
    this.todayTodos$ = this.todoService.getTodayTodos();

    this.route.data.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.isFavoriteView = !!data['favorite'];

      if (this.isFavoriteView) {
        this.todos$ = this.todoService.getFavoriteTodos();
        return;
      }

      this.todos$ = this.todoService.getOtherDayTodos();
    });
  }

  public handleDeleteItem(id: number): void {
    this.todoService
      .removeTodo(id)
      .pipe(this.locker.rxPipe(), takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  public handleDoneTodo(id: number) {
    this.todoService
      .toggleDone(id)
      .pipe(this.locker.rxPipe(), takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  public handleFavoriteTodo(id: number) {
    this.todoService
      .toggleFavorite(id)
      .pipe(this.locker.rxPipe(), takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  ngOnInit() {}
}
