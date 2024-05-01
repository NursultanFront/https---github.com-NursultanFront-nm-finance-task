import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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
    },
    required: ['id', 'title', 'createdAt', 'expirationDate', 'isFavorite'],
  },
} satisfies JSONSchema;

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todosKey = 'todos';
  public todos: TodoItem[] = [];

  constructor(
    private storageService: AsyncLocalStorageService,
    private snackBar: MatSnackBar
  ) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.storageService
      .getItem<TodoItem[]>(this.todosKey, todoItemSchema)
      .subscribe((todos) => {
        this.todos = todos || [];
      });
  }

  addTodo(todo: TodoItem): Observable<boolean> {
    this.todos.push(todo);
    return this.storageService.setItem(this.todosKey, this.todos).pipe(
      map(() => true),
      tap(() => {
        this.snackBar.open('Задача успешно добавлена', 'OK', {
          duration: 3000,
        });
      }),
      catchError((err) => {
        this.snackBar.open('Ошибка при добавлении задачи', 'OK', {
          duration: 3000,
        });
        return of(false);
      })
    );
  }

  removeTodo(id: number): Observable<boolean | undefined> {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return this.storageService.setItem(this.todosKey, this.todos).pipe(
      tap(() => {
        this.snackBar.open('Задача успешно добавлена', 'OK', {
          duration: 3000,
        });
      }),
      catchError((err) => {
        this.snackBar.open('Ошибка при добавлении задачи', 'OK', {
          duration: 3000,
        });
        return of(false);
      })
    );
  }

  clearTodos() {
    this.storageService.clear().subscribe();
  }
}
