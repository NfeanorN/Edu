import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PrintService {
  saveAsPdf(): void {
    window.print();
  }
}
