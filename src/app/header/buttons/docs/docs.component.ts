import { Component, Input } from '@angular/core';

@Component({
  selector: 'tripetto-buttons-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class ButtonsDocsComponent {
  @Input() dropdown: boolean;
}
