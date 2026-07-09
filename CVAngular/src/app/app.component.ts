import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CvAboutComponent } from './components/cv-about/cv-about.component';
import { CvAdditionalComponent } from './components/cv-additional/cv-additional.component';
import { CvEducationComponent } from './components/cv-education/cv-education.component';
import { CvExperienceComponent } from './components/cv-experience/cv-experience.component';
import { CvHeaderComponent } from './components/cv-header/cv-header.component';
import { CvLanguagesComponent } from './components/cv-languages/cv-languages.component';
import { CvSkillsComponent } from './components/cv-skills/cv-skills.component';
import { PdfBarComponent } from './components/pdf-bar/pdf-bar.component';
import { CvService } from './services/cv.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PdfBarComponent,
    CvHeaderComponent,
    CvAboutComponent,
    CvExperienceComponent,
    CvSkillsComponent,
    CvEducationComponent,
    CvLanguagesComponent,
    CvAdditionalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly cvService = inject(CvService);
  readonly profile = this.cvService.profile;
}
