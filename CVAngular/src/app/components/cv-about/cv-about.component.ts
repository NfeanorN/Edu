import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CvSectionComponent } from '../cv-section/cv-section.component';

@Component({
  selector: 'app-cv-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CvSectionComponent],
  template: `
    <app-cv-section sectionId="about" title="About">
      <p class="about">{{ text() }}</p>
    </app-cv-section>
  `,
  styleUrl: './cv-about.component.scss',
})
export class CvAboutComponent {
  readonly text = input.required<string>();
}
