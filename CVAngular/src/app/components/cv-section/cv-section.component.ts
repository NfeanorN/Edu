import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-cv-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [attr.aria-labelledby]="sectionId()">
      <h2 [id]="sectionId()">
        {{ title() }}
        @if (subtitle()) {
          <span class="cv-section__subtitle">{{ subtitle() }}</span>
        }
      </h2>
      <ng-content />
    </section>
  `,
  styleUrl: './cv-section.component.scss',
})
export class CvSectionComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly sectionId = input.required<string>();
}
