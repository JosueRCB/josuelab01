import { Component, Input } from '@angular/core';
import { CollectorComponent } from '../../../collector/collector.component';

@Component({
  selector: 'tripetto-buttons-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ButtonsControlsComponent {
  @Input() collector: CollectorComponent;
  @Input() dropdown: boolean;
}
