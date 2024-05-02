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
  public todos$ = this.todosSubject.asObservable();

  constructor(
    private storageService: AsyncLocalStorageService,
    private snackBar: MatSnackBar
  ) {}

  public loadInitialData(): void {
    this.storageService
      .getItem<TodoItem[]>(this.todosKey, todoItemSchema)
      .pipe(delay(500))
      .subscribe({
        next: (todos) => {
          if (todos && todos.length === 0) {
            this.snackBar.open('Please add tasks', 'OK');
          }

          this.todosSubject.next(todos || []);
        },
        error: (err) =>
          this.snackBar.open('Error loading tasks', 'OK', {
            duration: 3000,
          }),
      });
  }

  addTodo(todo: TodoItem): Observable<boolean> {
    const updatedTodos = [...this.todosSubject.value, todo];
    return this.storageService.setItem(this.todosKey, updatedTodos).pipe(
      delay(500),
      tap(() => {
        this.todosSubject.next(updatedTodos);
        this.snackBar.open('Task successfully added', 'OK', {
          duration: 3000,
        });
      }),
      map(() => true),
      catchError((err) => {
        this.snackBar.open('Error adding task', 'OK', {
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
      delay(500),
      tap(() => {
        this.todosSubject.next(updatedTodos);
        this.snackBar.open('Task successfully deleted', 'OK', {
          duration: 3000,
        });
      }),
      map(() => true),
      catchError((err) => {
        this.snackBar.open('Error deleting task', 'OK', {
          duration: 3000,
        });
        return of(false);
      })
    );
  }

  getTodayTodos(): Observable<TodoItem[]> {
    return this.todos$.pipe(
      map((todos) =>
        todos.filter(
          (todo) =>
            new Date(todo.expirationDate).toDateString() ===
            new Date().toDateString()
        )
      )
    );
  }

  getFavoriteTodos(): Observable<TodoItem[]> {
    return this.todos$.pipe(
      map((todos) => todos.filter((todo) => todo.isFavorite))
    );
  }

  getOtherDayTodos(): Observable<TodoItem[]> {
    return this.todos$.pipe(
      map((todos) =>
        todos.filter(
          (todo) =>
            new Date(todo.expirationDate).toDateString() !==
            new Date().toDateString()
        )
      )
    );
  }

  toggleDone(id: number): Observable<boolean> {
    const updatedTodos = this.todosSubject.value.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    return this.updateTodos(updatedTodos);
  }

  toggleFavorite(id: number): Observable<boolean> {
    const updatedTodos = this.todosSubject.value.map((todo) =>
      todo.id === id ? { ...todo, isFavorite: !todo.isFavorite } : todo
    );
    return this.updateTodos(updatedTodos);
  }

  private updateTodos(todos: TodoItem[]): Observable<boolean> {
    return this.storageService.setItem(this.todosKey, todos).pipe(
      delay(500),
      tap(() => {
        this.todosSubject.next(todos);
        this.snackBar.open('Task successfully updated', 'OK', {
          duration: 3000,
        });
      }),
      map(() => true),
      catchError((err) => {
        this.snackBar.open('Error updating task', 'OK', {
          duration: 3000,
        });
        return of(false);
      })
    );
  }
}
