import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DateTime } from 'luxon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TodoItem } from '../../interfaces/todo.interface';
import { Locker } from '../../../core/common/locker';
import { HighlightIfUrgentDirective } from '../../../shared/directives/high-light-if-urgent.directive';
import { CountdownTimerPipe } from '../../../shared/pipes/countdown-timer.pipe';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    CountdownTimerPipe,
    HighlightIfUrgentDirective,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent implements OnInit {
  public readonly locker = new Locker();

  @Input({ required: true }) todo!: TodoItem;
  @Input({ required: true }) isLocked!: boolean;

  @Output() deleteItem = new EventEmitter<number>();
  @Output() toggleDone = new EventEmitter<number>();
  @Output() toggleFavorite = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  get isToday(): boolean {
    const now = DateTime.now().startOf('day');
    const expDate = DateTime.fromMillis(
      typeof this.todo.expirationDate === 'number'
        ? this.todo.expirationDate
        : DateTime.fromISO(this.todo.expirationDate).toMillis()
    ).startOf('day');
    return now.equals(expDate);
  }

  public onDeleteTodo() {
    this.deleteItem.emit(this.todo.id);
  }

  public onDoneTodo() {
    this.toggleDone.emit(this.todo.id);
  }

  public onFavoriteTodo() {
    this.toggleFavorite.emit(this.todo.id);
  }
}
