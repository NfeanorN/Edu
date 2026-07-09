import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PrintService } from '../../services/print.service';

@Component({
  selector: 'app-pdf-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pdf-bar" role="toolbar" aria-label="Export CV">
      <span>To get PDF:</span>
      <button type="button" (click)="print()">Save as PDF</button>
      <span class="pdf-bar__hint">
        or press <kbd>Ctrl</kbd>+<kbd>P</kbd> → choose &quot;Save as PDF&quot; / &quot;Microsoft Print to PDF&quot;
      </span>
    </div>
  `,
  styleUrl: './pdf-bar.component.scss',
})
export class PdfBarComponent {
  private readonly printService = inject(PrintService);

  print(): void {
    this.printService.saveAsPdf();
  }
}
