import {
  Directive,
  Input,
  HostBinding,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlightIfUrgent]',
  standalone: true,
})
export class HighlightIfUrgentDirective implements OnChanges {
  @Input() appHighlightIfUrgent!: string | null;

  @HostBinding('style.color') color: string = 'black';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appHighlightIfUrgent']) {
      this.updateColor();
    }
  }

  private updateColor(): void {
    const timeLeft = this.appHighlightIfUrgent;
    if (timeLeft) {
      const parts = timeLeft.split(' ');
      const hours = parseInt(parts[0], 10);

      this.color = hours < 1 ? 'red' : 'black';
    }
  }
}
