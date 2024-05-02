import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TodoItem } from '../../interfaces/todo.interface';
import { Locker } from '../../../core/common/locker';

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
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent implements OnInit {
  public readonly locker = new Locker();

  @Input({ required: true }) todo!: TodoItem;
  @Input({ required: true }) isLocked!: boolean;

  @Output() deleteItem = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  public onDeleteTodo() {
    console.log('lolka');
    this.deleteItem.emit(this.todo.id);
  }
}
