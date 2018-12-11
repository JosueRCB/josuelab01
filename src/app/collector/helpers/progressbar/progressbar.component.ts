import { Component, Input } from '@angular/core';
import { Storyline } from 'tripetto-collector';

@Component({
  selector: 'tripetto-collector-progressbar',
  templateUrl: './progressbar.component.html'
})
export class ProgressbarComponent {
  @Input() storyline: Storyline;
}
