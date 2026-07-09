import { Injectable, signal } from '@angular/core';
import { CV_PROFILE } from '../data/cv.data';
import { CvProfile } from '../models/cv.model';

@Injectable({ providedIn: 'root' })
export class CvService {
  readonly profile = signal<CvProfile>(CV_PROFILE);
}
