import { EMPTY, Observable, Subject, UnaryFunction, pipe } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export class Locker {
  public changeLock = new Subject<boolean>();

  private counter = 0;
  private hasError = false;

  public get isLocked(): boolean {
    return this.counter > 0 || this.hasError;
  }

  public get isLockedByError(): boolean {
    return this.hasError;
  }

  public lock(): void {
    this.counter++;
    if (this.counter === 1) {
      this.changeLock.next(this.isLocked);
    }
  }

  public unlock(): void {
    if (this.counter > 0) {
      this.counter--;
      if (this.counter === 0) {
        this.changeLock.next(this.isLocked);
      }
    }
  }

  public rxPipe<T>(): UnaryFunction<Observable<T>, Observable<T>> {
    let hasError = false;
    this.lock();
    return pipe<Observable<T>, Observable<T>, Observable<T>>(
      catchError(() => {
        hasError = true;
        this.lockByError();
        return EMPTY;
      }),
      finalize(() => {
        this.unlock();
        if (!hasError) {
          this.unlockByNoError();
        }
      })
    );
  }

  private lockByError(): void {
    const wasLocked = this.isLocked;
    this.hasError = true;
    if (this.isLocked && !wasLocked) {
      this.changeLock.next(true);
    }
  }

  private unlockByNoError(): void {
    const wasLocked = this.isLocked;
    this.hasError = false;
    if (!this.isLocked && wasLocked) {
      this.changeLock.next(false);
    }
  }
}
