import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CvSectionComponent } from '../cv-section/cv-section.component';

@Component({
  selector: 'app-cv-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CvSectionComponent],
  template: `
    <app-cv-section sectionId="skills" title="Skills">
      <div class="skills" role="list">
        @for (skill of skills(); track skill) {
          <span class="skill" role="listitem">{{ skill }}</span>
        }
      </div>
    </app-cv-section>
  `,
  styleUrl: './cv-skills.component.scss',
})
export class CvSkillsComponent {
  readonly skills = input.required<readonly string[]>();
}
