import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncLocalStorageService } from '../../core/services/async-local-storage.service';

import { TodoItem } from '../interfaces/todo.interface';

import type { JSONSchema } from '@ngx-pwa/local-storage';

const todoItemSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      title: { type: 'string' },
      createdAt: { type: 'number' },
      expirationDate: { type: 'number' },
      expirationTime: { type: 'string' },
      isFavorite: { type: 'boolean' },
      done: { type: 'boolean' },
    },
    required: ['id', 'title', 'createdAt', 'expirationDate', 'isFavorite'],
  },
} satisfies JSONSchema;

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todosKey = 'todos';
  private todosSubject = new BehaviorSubject<TodoItem[]>([]);
  public todos$ = this.todosSubject.asObservable(); // Поток задач для подписки

  constructor(
    private storageService: AsyncLocalStorageService,
    private snackBar: MatSnackBar
  ) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.storageService
      .getItem<TodoItem[]>(this.todosKey, todoItemSchema)
      .subscribe({
        next: (todos) => this.todosSubject.next(todos || []),
        error: (err) =>
          this.snackBar.open('Ошибка при загрузке задач', 'OK', {
            duration: 3000,
          }),
      });
  }

  addTodo(todo: TodoItem): Observable<boolean> {
    const updatedTodos = [...this.todosSubject.value, todo];
    return this.storageService.setItem(this.todosKey, updatedTodos).pipe(
      delay(3000),
      tap(() => {
        this.todosSubject.next(updatedTodos);
        this.snackBar.open('Задача успешно добавлена', 'OK', {
          duration: 3000,
        });
      }),
      map(() => true),
      catchError((err) => {
        this.snackBar.open('Ошибка при добавлении задачи', 'OK', {
          duration: 3000,
        });
        return of(false);
      })
    );
  }

  removeTodo(id: number): Observable<boolean> {
    const updatedTodos = this.todosSubject.value.filter(
      (todo) => todo.id !== id
    );
    return this.storageService.setItem(this.todosKey, updatedTodos).pipe(
      delay(3000),
      tap(() => {
        this.todosSubject.next(updatedTodos);
        this.snackBar.open('Задача успешно удалена', 'OK', { duration: 3000 });
      }),
      map(() => true),
      catchError((err) => {
        this.snackBar.open('Ошибка при удалении задачи', 'OK', {
          duration: 3000,
        });
        return of(false);
      })
    );
  }

  clearTodos() {
    this.storageService.clear().subscribe(() => {
      this.todosSubject.next([]);
      this.snackBar.open('Все задачи удалены', 'OK', { duration: 3000 });
    });
  }
}
