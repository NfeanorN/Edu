import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Language } from '../../models/cv.model';
import { CvSectionComponent } from '../cv-section/cv-section.component';

@Component({
  selector: 'app-cv-languages',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CvSectionComponent],
  template: `
    <app-cv-section sectionId="languages" title="Languages">
      <div class="languages">
        @for (lang of languages(); track lang.name) {
          <span class="lang-item">
            <strong>{{ lang.name }}</strong> — {{ lang.level }}
          </span>
        }
      </div>
    </app-cv-section>
  `,
  styleUrl: './cv-languages.component.scss',
})
export class CvLanguagesComponent {
  readonly languages = input.required<readonly Language[]>();
}
