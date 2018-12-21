import { Component, Input } from '@angular/core';
import { Storyline } from 'tripetto-collector';

@Component({
  selector: 'tripetto-collector-buttons',
  templateUrl: './buttons.component.html'
})
export class ButtonsComponent {
  @Input() storyline: Storyline;
}
