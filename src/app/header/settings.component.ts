import { Component, Input  } from '@angular/core';
import { CollectorComponent } from '../collector/collector.component';
import { TModes } from 'tripetto-collector';

@Component({
  selector: 'tripetto-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  @Input() collector: CollectorComponent;
}
