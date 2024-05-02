import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of, interval } from 'rxjs';
import { map, startWith, takeWhile } from 'rxjs/operators';

@Pipe({
  name: 'countdownTimer',
  standalone: true,
})
export class CountdownTimerPipe implements PipeTransform {
  transform(time?: string): Observable<string> {
    if (!time || !time.trim()) {
      return of('Нет данных');
    }

    return interval(1000).pipe(
      startWith(0),
      map(() => {
        const timeParts = time.split(':');
        const targetTime = new Date();
        targetTime.setHours(
          parseInt(timeParts[0], 10),
          parseInt(timeParts[1], 10),
          0
        );

        const now = new Date();
        const duration = targetTime.getTime() - now.getTime();

        if (duration < 0) {
          return 'Время истекло';
        }

        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((duration / (1000 * 60)) % 60);
        const seconds = Math.floor((duration / 1000) % 60);

        return `${hours}ч ${minutes}м ${seconds}с`;
      }),
      takeWhile((x) => x !== 'Время истекло', true)
    );
  }
}
