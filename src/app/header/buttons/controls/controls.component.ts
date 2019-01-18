import { Component, Input } from '@angular/core';
import { CollectorComponent } from '../../../collector/collector.component';

@Component({
  selector: 'tripetto-buttons-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  @Input() collector: CollectorComponent;
  @Input() mode: 'inline' | 'embedded';

  get isEmbedded(): boolean {
    return this.mode === 'embedded';
  }
}
