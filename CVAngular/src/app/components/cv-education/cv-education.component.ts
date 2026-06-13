import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Education } from '../../models/cv.model';
import { CvSectionComponent } from '../cv-section/cv-section.component';

@Component({
  selector: 'app-cv-education',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CvSectionComponent],
  template: `
    <app-cv-section sectionId="education" title="Education">
      @for (item of education(); track item.institution) {
        <div class="edu-item">
          <p class="institution">{{ item.institution }}</p>
          <p class="degree">{{ item.degree }}</p>
          <p class="focus">{{ item.focus }}</p>
        </div>
      }
    </app-cv-section>
  `,
  styleUrl: './cv-education.component.scss',
})
export class CvEducationComponent {
  readonly education = input.required<readonly Education[]>();
}
