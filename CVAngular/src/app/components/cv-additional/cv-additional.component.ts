import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-cv-additional',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="extra-section" aria-labelledby="additional">
      <h3 id="additional">Additional</h3>
      <p>{{ text() }}</p>
    </aside>
  `,
  styleUrl: './cv-additional.component.scss',
})
export class CvAdditionalComponent {
  readonly text = input.required<string>();
}
