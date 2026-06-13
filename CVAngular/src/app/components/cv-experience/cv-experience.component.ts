import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { JobExperience } from '../../models/cv.model';
import { CvSectionComponent } from '../cv-section/cv-section.component';

@Component({
  selector: 'app-cv-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CvSectionComponent],
  template: `
    <app-cv-section
      sectionId="experience"
      title="Work experience"
      [subtitle]="'(' + years() + ' years)'"
    >
      @for (job of jobs(); track job.company) {
        <article class="job">
          <div class="job-header">
            <span class="company">{{ job.company }}</span>
            <time class="dates">{{ job.dates }}</time>
          </div>
          <p class="role">{{ job.role }}</p>
          <ul>
            @for (item of job.responsibilities; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </article>
      }
    </app-cv-section>
  `,
  styleUrl: './cv-experience.component.scss',
})
export class CvExperienceComponent {
  readonly jobs = input.required<readonly JobExperience[]>();
  readonly years = input.required<number>();
}
