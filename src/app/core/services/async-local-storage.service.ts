import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';

import type { JSONSchema } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AsyncLocalStorageService {
  constructor(private storage: StorageMap) {}

  setItem<T>(key: string, data: T): Observable<undefined> {
    console.log(data);

    console.log(key);

    return this.storage.set(key, data);
  }

  getItem<T>(key: string, schema: JSONSchema): Observable<T | undefined> {
    return this.storage.get<T>(key, schema);
  }

  removeItem(key: string): Observable<undefined> {
    return this.storage.delete(key);
  }

  clear(): Observable<void> {
    return this.storage.clear();
  }
}
