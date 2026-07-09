import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContactLink } from '../../models/cv.model';

@Component({
  selector: 'app-cv-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <h1>{{ fullName() }}</h1>
      <p class="headline">{{ headline() }}</p>

      <div class="contact">
        @for (item of contacts(); track item.href) {
          <span>
            {{ item.icon }}
            <a
              [href]="item.href"
              [attr.target]="item.external ? '_blank' : null"
              [attr.rel]="item.external ? 'noopener noreferrer' : null"
            >
              {{ item.label }}
            </a>
          </span>
        }
      </div>

      <div class="work-format">
        <strong>Work format:</strong> {{ workFormat() }}
      </div>
    </header>
  `,
  styleUrl: './cv-header.component.scss',
})
export class CvHeaderComponent {
  readonly fullName = input.required<string>();
  readonly headline = input.required<string>();
  readonly contacts = input.required<readonly ContactLink[]>();
  readonly workFormat = input.required<string>();
}
