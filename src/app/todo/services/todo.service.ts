import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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

  constructor(private storageService: AsyncLocalStorageService) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.storageService
      .getItem<TodoItem[]>(this.todosKey, todoItemSchema)
      .subscribe((todos) => {
        this.todos = todos || [];
      });
  }

  addTodo(todo: TodoItem): void {
    this.todos.push(todo);
    this.updateStorage();
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.updateStorage();
  }

  private updateStorage(): void {
    this.storageService.setItem(this.todosKey, this.todos).subscribe({
      next: () => console.log('Data saved successfully'),
      error: (err) => console.error('Error saving data', err),
    });
  }
}
